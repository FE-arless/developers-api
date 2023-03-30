
export function getSignUpTemplate(userEmail: string, token: string): string {
    return `
    <html>
        <body style="font-family: sans-serif;">
        <center style="width: 100%">
        <table align="center" cellspacing="0" cellpadding="0">
            <tbody style="font-size: 18px;">
                <tr>
            <h1>Hi ${userEmail},</h1>
            </tr>
            <tr>
            <p>We received a request to reset the password on your account.</p>
            </tr>
            <tr>
            <p>Click the button below so it will redirects to the password reset page.</p>
            </tr>
            <tr style="height: 50px;"></tr>
            <tr>
            <td>
                <table cellspacing="0" cellpadding="0" align="center">
                    <tr>
                    <td style="text-align: center; border-radius: 8px; padding: 8px; width: 150px; height: 30px; background-color: #79ff66; vertical-align: middle;">
                        <a style="color: white; text-decoration: none; display: block;" href="https://ec2-3-90-70-139.compute-1.amazonaws.com/signup/verify/${token}" target="_blank">Verify email</a>
                    </td>
                    </tr>
                </table>
            </td>
            </tr>
            </tbody>
        </table>
            </center>
        </body>
    </html>
    `
}