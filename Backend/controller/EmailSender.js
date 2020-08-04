"use strict";
const nodemailer = require("nodemailer");
const UtilFunctions = require("../utils/Utils"); 

 function getTransporter() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      /*
       * Do NOT change the below user and password. This was created by etherial for email test purpose
       */
      user: "alfonzo91@ethereal.email",
      pass: "GuMbbsrUWzJVfr15CV",
    },
  });
  return transporter;
}

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(email) {
let transporter = getTransporter();
  console.log("Inside send email");
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"City Sports 👻" <citysports@dev.com>', // sender address
      to: email.to, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: email.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

function getEmailObject(tos, subject, text, html) {
  console.log(html);
  console.log(UtilFunctions.isNullOrUndefined(tos));
  return {
    to: UtilFunctions.isNullOrUndefined(tos) ? tos : Array.isArray(tos) ? tos.split(",") : tos,
    subject: subject,
    html: html
  }
}


module.exports = { sendEmail, getEmailObject };
