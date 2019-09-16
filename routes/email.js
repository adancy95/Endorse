const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user:  process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USERNAME,
  to:  process.env.Email_RECIPIENT, 
  subject: 'Awesome Subject', 
  text: 'Awesome Message',
  html: '<b>Awesome Message</b>'
})
.then(info => console.log(info))
.catch(error => console.log(error))

