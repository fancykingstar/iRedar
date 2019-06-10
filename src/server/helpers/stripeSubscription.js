const logger = require("../configs/logger");
const stripe_key = require('../configs/keys').stripe.secret_key;
const stripe = require("stripe")(stripe_key.toString());
const productPlan = require('../configs/keys').stripe.product;

// Load models
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');
const User = require('../models/User');

const monthlyPlanToPrice = {
    Smart: 7500,
    Business: 15000,
    Enterprise: 25000
};

const yearlyPlanToPrice = {
    Smart: 81588,
    Business: 162000,
    Enterprise: 269988
};

async function createInactivePlans(organization, plan, interval, amount) {
    let planName = organization.domain.replace(/\s+/g, "-").replace(".", "-").toLowerCase() + "-" + plan.toLowerCase() + "-" + interval.toLowerCase();
    const stripePlan = await stripe.plans.create({
        product: productPlan,
        active: true,
        id: planName + "-plan",
        nickname: organization.name + " " + interval + "ly " + plan + " plan",
        currency: "usd",
        amount: amount,
        interval: interval,
        usage_type: "licensed",
        billing_scheme: "per_unit"
    });
};

// CREATE CUSTOMER and SUBSCRIPTION
exports.doCreateAdminUserWithPlanAndSubscribe = async (profileId, plan = "Smart", interval = "month") => {
    let profile = await Profile.findOne({_id: profileId});
    let permission = await Permission.findOne({profile: profileId});
    let user = await User.findOne({_id: profile.user});
    let organization = await Organization.findOne({_id: permission.organization});

    let amount = 7500;
    if (interval === "month") {
        amount = monthlyPlanToPrice[plan];
    } else {
        amount = yearlyPlanToPrice[plan];
    }

    let planName = organization.domain.replace(/\s+/g, "-").replace(".", "-").toLowerCase() + "-" + plan.toLowerCase() + "-" + interval.toLowerCase();
    const stripePlan = await stripe.plans.create({
        product: productPlan,
        active: true,
        id: planName + "-plan",
        nickname: organization.name + " " + interval + "ly " + plan + " plan",
        currency: "usd",
        amount: amount,
        interval: interval,
        usage_type: "licensed",
        billing_scheme: "per_unit",
        trial_period_days: 30
    });

    for (let key in monthlyPlanToPrice) {
        if (monthlyPlanToPrice.hasOwnProperty(key)) {
            if (amount !== monthlyPlanToPrice[key]) {
                console.log(key + " -> " + monthlyPlanToPrice[key]);
                await createInactivePlans(organization, key, "month", monthlyPlanToPrice[key]);
            }
        }
    }

    for (let key in yearlyPlanToPrice) {
        if (yearlyPlanToPrice.hasOwnProperty(key)) {
            if (amount !== yearlyPlanToPrice[key]) {
                console.log(key + " -> " + yearlyPlanToPrice[key]);
                await createInactivePlans(organization, key, "year", yearlyPlanToPrice[key]);
            }
        }
    }

    console.log(stripePlan);
    const stripeCustomer = await stripe.customers.create({
        name: profile.firstName + " " + profile.lastName,
        description: "Customer for " + organization.name,
        email: profile.email,
        phone: profile.phoneNumber,
        source: "tok_visa"
    });
    console.log(stripeCustomer);
    const stripeSubscription = await stripe.subscriptions.create({
        customer: stripeCustomer.id,
        items: [
            {
                plan: stripePlan.id,
                quantity: 1
            }
        ]
    });
    console.log(stripeSubscription);
    user.stripe.stripeCustomerId = stripeCustomer.id;
    user.stripe.stripeSubscriptionId = stripeSubscription.id;
    await user.save();
    organization.stripe.stripeAdminCustomerId = stripeCustomer.id;
    organization.stripe.stripeSubscriptionId = stripeSubscription.id;
    organization.stripe.stripePlanId = stripePlan.id;
    organization.stripe.stripeAdminCustomerToken = "tok_visa";
    organization.stripe.plan = plan;
    organization.stripe.interval = interval;
    await organization.save();
};

// UPDATE SUBSCRIPTION
exports.doUpdateSubscription = async (profileId) => {
    let profile = await Profile.findOne({_id: profileId});
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    let user = await User.findOne({_id: profile.user});

    const stripeSubscription = await stripe.subscriptions.retrieve(organization.stripe.stripeSubscriptionId);
    logger.debug("Business Found for Customer is: ", organization);
    let post_message = {
        "items": [{
            id: stripeSubscription.items.data[0].id,
            quantity: organization.users.length
        }]
    };

    return await stripe.subscriptions.update(user.stripe.stripeSubscriptionId, post_message);
};

// UPDATE Customer user information
exports.doUpdateAdminCustomer = async (profileId, firstName, lastName, email, phoneNumber) => {
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    return await stripe.customers.update(
        organization.stripe.stripeAdminCustomerId,
        {
            name: firstName + " " + lastName,
            email: email,
            phone: phoneNumber
        });
};

// UPDATE Customer payment information
exports.doUpdatePayment = async (profileId, source) => {
    console.log(source);
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    return await stripe.customers.update(
        organization.stripe.stripeAdminCustomerId,
        {
            source: source
        });
};

// Change plan for the account
exports.doChangePlan = async (profileId, plan = "Smart", interval = "month", source = "tok_visa") => {
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    let planId = organization.domain.replace(/\s+/g, "-").replace(".", "-").toLowerCase() + "-" + plan.toLowerCase() + "-" + interval.toLowerCase() + "-plan";

    // update new subscription and plans
    const stripeSubscription = await stripe.subscriptions.retrieve(organization.stripe.stripeSubscriptionId);
    const updatedStripeSubscription = await stripe.subscriptions.update(organization.stripe.stripeSubscriptionId, {
        cancel_at_period_end: false,
        items: [{
            id: stripeSubscription.items.data[0].id,
            plan: planId,
            quantity: organization.users.length
        }]
    });
    console.log(updatedStripeSubscription);

    organization.stripe.stripePlanId = planId;
    organization.stripe.stripeAdminCustomerToken = source;
    organization.stripe.plan = plan;
    organization.stripe.interval = interval;
    await organization.save();
};

// Unsubscribed the account
exports.doUnsubscribe = async profileId => {
    let profile = await Profile.findOne({_id: profileId});
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    let user = await User.findOne({_id: profile.user});

    await stripe.subscriptions.del(user.stripe.stripeSubscriptionId);
    await stripe.plans.del(organization.stripe.stripePlanId);

    user.stripe.stripeSubscriptionId = undefined;
    await user.save();
    organization.stripe.stripePlanId = undefined;
    organization.stripe.stripeAdminCustomerToken = undefined;
    organization.stripe.plan = undefined;
    organization.stripe.interval = undefined;
    await organization.save();
};