exports.referralPreview = (appHost, referral) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Password Reset</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
        /**
                         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                         */
        @media screen {
            @font-face {
                font - family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
                    url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }

            @font-face {
                font - family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
                    url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }

        /**
     * Avoid browser level font resizing.
     * 1. Windows Mobile
     * 2. iOS / OSX
     */
        body,
        table,
        td,
        a {
            -ms - text - size - adjust: 100%;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
        }

        /**
               * Remove extra space added to tables and cells in Outlook.
               */
        table,
        td {
            mso - table - rspace: 0pt;
            mso-table-lspace: 0pt;
        }

        /**
               * Better fluid images in Internet Explorer.
               */
        img {
            -ms - interpolation - mode: bicubic;
        }

        /**
               * Remove blue links for iOS devices.
               */
        a[x-apple-data-detectors] {
            font - family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }

        /**
               * Fix centering issues in Android 4.4.
               */
        div[style*='margin: 16px 0;'] {
            margin: 0 !important;
        }

        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /**
               * Collapse table borders to avoid space between cells.
               */
        table {
            border - collapse: collapse !important;
        }

        a {
            color: #1a82e2;
        }

        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>
</head>

<body style="background-color: #e9ecef;">
    <!-- start preheader -->
    <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        A preheader is the short summary text that follows the subject line when
        an email is viewed in the inbox.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <!-- start hero -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" >
                            <tr>
                                <td align="center" valign="top" width="600">
                                    <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; ">
                            <h1
                                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                ${referral.formName}
                            </h1>
                        </td>
                    </tr>
                </table>

                <!--[if (gte mso 9)|(IE)]>
        </td>
                            </tr>
                        </table>
                        <![endif]-->
            </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                                <td align="center" valign="top" width="600">
                                    <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <label style="margin-right:20px;">Firstname</label>
                            <input style="width: 100%" type="text" readonly value=${referral.firstName || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Lastname</label>
                            </div>
                            <input style="width: 100%" type="text" readonly value=${referral.lastName || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Email</label>
                            </div>
                            <input style="width: 100%" type="text" readonly value=${referral.email || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Address</label>
                            </div>
                            <input style="width: 100%" type="text" readonly value=${referral.address || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Province</label>
                            </div>
                            <input style="width: 100%" type="text" readonly value=${referral.province || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">City</label>
                            </div>
                            <input style="width: 100%" type="text" readonly value=${referral.city || ''}></input>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Work experience</label>
                            </div>
                            <textarea style="width: 100%" type="text" readonly>${referral.workExperience || ''}</textarea>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding-left: 24px; padding-right: 24px; padding-top: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <div>
                                <label style="margin-right:20px;">Note</label>
                            </div>
                            <textarea style="width: 100%" readonly>${referral.note || ''}</textarea>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">
                                Link:
                            </p>
                            <p style="margin: 0;">
                                <a href="${appHost}/forms/${referral.formName}/${referral.submission}" target="_blank">
                                    ${appHost}/forms/${referral.formName}/${referral.submission}
                                </a>
                            </p>
                        </td>
                    </tr>
                    <!-- end copy -->
                </table>

                <!--[if (gte mso 9)|(IE)]>
        </td>
                            </tr>
                        </table>
                        <![endif]-->
            </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->

        <!-- end footer -->
    </table>

    <!-- end body -->
</body>

</html>
`