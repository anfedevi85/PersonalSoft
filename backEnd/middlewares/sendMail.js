let nodemailer = require('nodemailer');
let mailConfig = require('../config/emailPruebas');
//const hbs = require('nodemailer-express-handlebars');

let transporter = nodemailer.createTransport({
  service: mailConfig.service,
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: mailConfig.auth,
});

let sendGeneralMail = async function (data) {
	console.log('enviando mensaje');
  await transporter.sendMail({
    from: '"Support"<support@get-preferred.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    html:
	`<style>html,body { padding: 0; margin:0; }</style>
	<div style="font-family:Arial,Helvetica,sans-serif; line-height: 1.5; font-weight: normal; font-size: 15px; color: #2F3044; min-height: 100%; margin:0; padding:0; width:100%; background-color:#edf2f7">
		<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto; padding:0; max-width:600px">
			<tbody>
				<tr>
					<td align="center" valign="center" style="text-align:center; padding: 40px">
						<div style="font-size: 24px;">
								<strong>Preferred</strong>
							</div>
					</td>
				</tr>
				<tr>
					<td align="left" valign="center">
						<div style="text-align:left; margin: 0 20px; padding: 40px; background-color:#ffffff; border-radius: 6px">
							<!--begin:Email content-->
							<div style="padding-bottom: 30px; font-size: 20px;">
								<strong>${data.name}</strong>
							</div>
							<div style="padding-bottom: 30px; font-size: 17px;">
								<strong>Welcome to Preferred RS!</strong>
							</div>
							<div style="padding-bottom: 30px; font-size: 24px; text-align:center;">
								<strong>Verify your Preferred RS Account</strong>
							</div>
							<div style="padding-bottom: 30px; font-size: 17px;">
								Thank you for choosing Preferred Restoration Software.
							</div>
							<div style="padding-bottom: 30px">To verifiy your account, get started by clicking the button below.  A temporary verification code will be sent via SMS to the phone number associated with ${data.to}.  Once verified you will then be prompted to create a unique password and e-signature.</div>
							<div style="padding-bottom: 40px; text-align:center;">
								<a href="${data.link}" rel="noopener" style="text-decoration:none;display:inline-block;text-align:center;padding:0.75575rem 1.3rem;font-size:0.925rem;line-height:1.5;border-radius:0.35rem;color:#ffffff;background-color:#009ef7;border:0px;margin-right:0.75rem!important;font-weight:600!important;outline:none!important;vertical-align:middle" target="_blank">Activate Account</a>
							</div>
							<!--end:Email content-->
							<div style="padding-bottom: 10px">Kind Regards,
							<br> The Get-Preferred Team.
							<tr>
								<td align="center" valign="center" style="font-size: 13px; text-align:center;padding: 20px; color: #6d6e7c;">
									<p>&copy; 2024 Get-Preferred. All Rights Reserved.</p>
									<p>              
									<a href="" rel="noopener" target="_blank"> ConTact Us </a>.
									<a href="" rel="noopener" target="_blank">Terms of Use</a>.
									<a href="" rel="noopener" target="_blank">Privacy Police</a>.
									</p>
								</td>
							</tr></br></div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>`, 




	// ` <style>html,body { padding: 0; margin:0; }</style>

    //         <div style="font-family:Arial,Helvetica,sans-serif; line-height: 1.5; font-weight: normal; font-size: 15px; color: #2F3044; min-height: 100%; margin:0; padding:0; width:100%; background-color:#edf2f7">
	// 		<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto; padding:0; max-width:600px">
	// 		<tbody>
	// 		<tr>
	// 			<td align="center" valign="center" style="text-align:center; padding: 40px">
					
	// 			</td>
	// 		</tr>
	// 		<tr>
	// 			<td align="left" valign="center">
	// 				<div style="text-align:left; margin: 0 20px; padding: 40px; background-color:#ffffff; border-radius: 6px">
	// 					<!--begin:Email content-->

    //                                             <h1 style="color:009EF7;">  ${data.name} </h1>
	// 					<div style="padding-bottom: 30px; font-size: 17px;">
	// 						<strong>Welcome to App Get-Preferred</strong>
	// 					</div>
                                               
	// 					<div style="padding-bottom: 30px"> To enter your account, please click on the button below and introduce your email address and password.</div>

    //                                             <h3> User Email : ${data.email}</h3>
    //                                             <h3> Password: ${data.newpassword} </h3>


	// 					<div style="padding-bottom: 40px; text-align:center;">
	// 						<a href="${data.link}" rel="noopener" style="text-decoration:none;display:inline-block;text-align:center;padding:0.75575rem 1.3rem;font-size:0.925rem;line-height:1.5;border-radius:0.35rem;color:#ffffff;background-color:#009EF7;border:0px;margin-right:0.75rem!important;font-weight:600!important;outline:none!important;vertical-align:middle" target="_blank">Log In</a>
	// 					</div>


	// 					<div style="padding-bottom: 10px">if you need more help do not hesitate in contacting us.</div>
    //                                             <div style="padding-bottom: 30px"><a href="https://wa.me/573133774716" target="_blank">Whatsapp</a></div>

	// 					<div style="padding-bottom: 30px">Please find enclosed the documents regarding tutorial 
	// 					<a  rel="noopener" target="_blank" style="text-decoration:none;color: #009EF7">User Manual</a>.</div>
	// 					<!--end:Email content-->
	// 					<div style="padding-bottom: 10px">King regards,
	// 					<br>The Get-Preferred Team.
	// 					<tr>
	// 						<td align="center" valign="center" style="font-size: 13px; text-align:center;padding: 20px; color: #6d6e7c;">
	// 							<p>Canada.</p>
	// 							<p>Copyright ©2023
	// 							<a href="https://get-preferred.com" rel="noopener" target="_blank">Get-Preferred</a>.</p>
	// 						</td>
	// 					</tr></br></div>
	// 				</div>
	// 			</td>
	// 		</tr>
	// 	</tbody>
	// </table>
	// </div> `,
  });
};

transporter.verify().then(() => {
  console.log('Listo para enviar mails');
});

module.exports = sendGeneralMail;
