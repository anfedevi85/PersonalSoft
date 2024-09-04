// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC5d280018b2bb89c7a804d02267ddbd79";
const authToken = "";
const verifySid = "VA501e470354a724cddf808215743c81c7";
const client = require("twilio")(accountSid, authToken);


let newOTP = async function (data){
client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+573133774716", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+573133774716", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });

  console.log('otp enviado ', data);
}
  module.exports = newOTP;


client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+573133774716", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+573133774716", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });