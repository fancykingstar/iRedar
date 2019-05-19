const logger = require("../configs/logger");
const stripe_key = require('../configs/keys').stripe.secret_key;
const stripe = require("stripe")(stripe_key);
const productPlan = require('../configs/keys').stripe.product;

// Load models
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');
const User = require('../models/User');

// CREATE CUSTOMER and SUBSCRIPTION
exports.doCreateAdminUserWithPlanAndSubscribe = async (profileId, plan = "smart", interval = "monthly") => {
    let profile = await Profile.findOne({_id: profileId});
    let permission = await Permission.findOne({profile: profileId});
    let user = await User.findOne({_id: profile.user});
    let organization = await Organization.findOne({_id: permission.organization});

    logger.debug("Organization Found for Customer is: ", organization);

    let planName = organization.domain.replace(/\s+/g, "-").toLowerCase();
    const stripePlan = await stripe.plans.create({
        product: productPlan,
        id: planName + "-" + plan + "-plan",
        nickname: organization.name + " plan",
        currency: "usd",
        interval: interval,
        usage_type: "licensed",
        billing_scheme: "per_unit",
        trial_period_days: 30
    });

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
    user.stripeCustomerId = stripeCustomer.id;
    user.stripeSubscriptionId = stripeSubscription.id;
    await user.save();
    organization.stripeAdminCustomerId = stripeCustomer.id;
    organization.stripeSubscriptionPlanId = stripeSubscription.items.data[0].id;
    organization.stripePlanId = stripePlan.id;
    organization.stripeAdminCustomerToken = "tok_visa";
    await organization.save();
};

// UPDATE SUBSCRIPTION
exports.doUpdateSubscription = async (profileId) => {
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});

    logger.debug("Business Found for Customer is: ", organization);
    let post_message = {
        "items": [{
            id: organization.stripeSubscriptionPlanId,
            quantity: organization.users.length
        }]
    };

    return await stripe.subscriptions.update(organization.stripeAdminCustomerId, post_message);
};

// UPDATE Customer user information
exports.doUpdatAdminCustomer = async (profileId, firstName, lastName, email, phoneNumber) => {
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    return await stripe.customers.update(
        organization.stripeAdminCustomerId,
        {
            name: firstName + " " + lastName,
            email: email,
            phone: phoneNumber
        });
};

// UPDATE Customer payment information
exports.doUpdatePayment = async (profileId, token) => {
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    return await stripe.customers.update(
        organization.stripeAdminCustomerId,
        {
            source: token
        });
};

// Unsubscriped the account
exports.doUnsubscribe = async profileId => {
    let profile = await Profile.findOne({_id: profileId});
    let permission = await Permission.findOne({profile: profileId});
    let organization = await Organization.findOne({_id: permission.organization});
    let user = await User.findOne({_id: profile.user});

    await stripe.subscriptions.del(user.stripeSubscriptionId);
    await stripe.plans.del(organization.stripePlanId);


    user.stripeCustomerId = undefined;
    user.stripeSubscriptionId = undefined;
    await user.save();
    organization.stripeAdminCustomerId = undefined;
    organization.stripeSubscriptionPlanId = undefined;
    organization.stripePlanId = undefined;
    organization.stripeAdminCustomerToken = undefined;
    await organization.save();
};