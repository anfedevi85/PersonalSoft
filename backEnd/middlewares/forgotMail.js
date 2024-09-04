let nodemailer = require("nodemailer");
let mailConfig = require("../config/email");
//const hbs = require('nodemailer-express-handlebars');

let transporter = nodemailer.createTransport({
	service 	: mailConfig.service,
	host 		: mailConfig.host,
	port 		: mailConfig.port,
	secure 		: mailConfig.secure,
	auth 		: mailConfig.auth
});

let sendGeneralMail = async function (data) {


        
               await transporter.sendMail({
                        from: '"Support"<support@get-preferred.com>', // sender address
                        to: data.to, // list of receivers
                        subject: data.subject, // Subject line
                        html:`
                        <style>html,body { padding: 0; margin:0; }</style>
 
                        <div style="font-family:Arial,Helvetica,sans-serif; line-height: 1.5; font-weight: normal; font-size: 15px; color: #2F3044; min-height: 100%; margin:0; padding:0; width:100%; background-color:#edf2f7">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto; padding:0; max-width:600px">
                <tbody>
                        
                        <tr>
                                <td align="left" valign="center">
                                        <div style="text-align:left; margin: 50px 20px; padding: 40px; background-color:#ffffff; border-radius: 6px">
                                                <!--begin:Email content-->
 
                                                <h1 style="color:blue;">  ${data.name} </h1>
                                                <div style="padding-bottom: 30px; font-size: 17px;">
                                                        <strong>Forgot Your Password ?</strong>

                                                        <div style="padding-bottom: 10px">You are receiving this email because we received a password reset request for your account. To proceed with the password reset please click on the button below:</div>
                                                </div>
                                                <div style="padding-bottom: 40px; text-align:center;">
                                                        <a href="${data.link}" rel="noopener" style="text-decoration:none;display:inline-block;text-align:center;padding:0.75575rem 1.3rem;font-size:0.925rem;line-height:1.5;border-radius:0.35rem;color:#ffffff;background-color:#009EF7;border:0px;margin-right:0.75rem!important;font-weight:600!important;outline:none!important;vertical-align:middle" target="_blank">Reset Password</a>
                                                </div>
 
 
                                                <div style="padding-bottom: 10px">This password reset link will expire in 60 minutes. If you did not request a password reset, no further action is required.</div>
                                                <div style="padding-bottom: 10px">If you need more help don\'t hesitate in contacting us.</div>
                                                <div style="padding-bottom: 30px"><a href="https://wa.me/573133464451" target="_blank">Whatsapp</a></div>
 
                                                
                                                <!--end:Email content-->
                                                <div style="padding-bottom: 10px">Kind regards,
                                                <br>Get-Preferred Team.
                                                <tr>
                                                        <td align="center" valign="center" style="font-size: 13px; text-align:center;padding: 20px; color: #6d6e7c;">
                                                                <p>Canada.</p>
                                                                <p>Copyright © 2023
                                                                <a href="https://get-preferred.com" rel="noopener" target="_blank">Get-Preferred</a>.</p>
                                                        </td>
                                                </tr></br></div>
                                        </div>
                                </td>
                        </tr>
                </tbody>
        </table>
 </div>
                       `
                      });
                
    
}

// transporter.verify().then(()=> {
//         console.log('Listo para enviar Emails para cambiar contraseña');
// })

module.exports = sendGeneralMail