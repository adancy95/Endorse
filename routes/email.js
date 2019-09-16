const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD 
  }
});

let mailOptions = {
  from: process.env.EMAIL_USERNAME,
  to: process.env.Email_RECIPIENT,
  subject: "testing emails",
  text: "It worked"

}

transporter.sendMail(mailOptions, function(err, data){
  if(err){
    console.log("error ocurred", err)
  }else{
    console.log("email sent")
  }
})