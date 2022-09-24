const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '103652211989-5fsrlff3o20kbtk5bclqhgt8aap7s453.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04pMdhnGkO-UHCgYIARAAGAQSNwF-L9IrzeR4k9cfBeTckKc6qcR3CawZIHJurXB3mu-Wnf686xZOT4ok_7Yo5uxu4p4MCE4mQkg'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

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

   

      const result = await transport.sendMail(mailOptions)
      return result


        
    } catch (error) {
        return error
    }
}

module.exports={sendMail};

  