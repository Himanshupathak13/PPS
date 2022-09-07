const nodemailer = require('nodemailer')
const { google } = require('googleapis')
//const jwt = require('jsonwebtoken');



const CLIENT_ID = '103652211989-5fsrlff3o20kbtk5bclqhgt8aap7s453.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04PPgieIH1XUuCgYIARAAGAQSNwF-L9Ir-883Cz0oYAS5GeKpDT-rFpS2C7BlxHf4iJCN1Ty3WWNKHnMu9cAUTtPGNEQ8CFKd5tU'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

//const JWT_SECRET = 'some super secret'



async function sendMail(email,token) {
    

    try {
      const accessToken = await oAuth2Client.getAccessToken()
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'mshashank19@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        }
      })
      
      // const secret = JWT_SECRET;
      //     const payload = {
      //       email: email,

      //     };
      //     const token = jwt.sign(payload, secret, { expiresIn: '15m' });
      //     const link = `http://localhost:3001/Reset-password/${email}/${token}`;
      
      
           
      console.log(email);
      console.log(token);
      const mailOptions = {
        from: 'MSHASHANK19 📧 <mshashank19@gmail.com>',
        to: email,
        subject: 'Hello from gmail using API',
        text: 'Hello from Shashank Mishra',
        html:`
        <p>You requested for password reset</p>
        <h5>click in this <a href="http://localhost:3001/Reset-password/${email}/${token}">Link</a>`
      };

      //  console.log(email);
      //  console.log(token);

      const result = await transport.sendMail(mailOptions)
      return result


        
    } catch (error) {
        return error
    }
}

//  sendMail(email,token)
//    .then((result) => console.log('Email sent...', result))
//    .catch((error) => console.log(error.message));
module.exports={sendMail};