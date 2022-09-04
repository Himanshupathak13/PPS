const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const jwt = require('jsonwebtoken');
//const { changeUser } = require("../db/conn");
const { sendMail } = require('../app2')



const JWT_SECRET = 'some super secret'


router.post("/create", (req, res) => {


  const { firstName, lastName, gender, email, password, confirmPassword, fileName } = req.body;
  const sqlInsert = "INSERT INTO users (firstName,lastName,gender,email,password,confirmPassword,fileName) VALUES (?,?,?,?,?,?,?)";
  conn.query(sqlInsert, [firstName, lastName, gender, email, password, confirmPassword, fileName], (err, result) => {
    if (err)
      console.log(err);
    res.send("DB")

  })

})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const sqlShow = "SELECT * FROM users WHERE email=? AND password=?"
    conn.query(sqlShow, [email, password], (err, result) => {
      console.log("hii", result)
      console.log("hello", err)
      if (result.length > 0) {
        let successresult = {}
        successresult['result'] = result
        successresult['status'] = 'success'
        console.log("success", successresult);
        res.send(successresult);
      }
      else {
        let errorresult = {}
        errorresult['error'] = err
        errorresult['status'] = 'error'
        console.log("else part", errorresult);
        res.send(errorresult)

      }

    });
  } catch (err) {
    let catchresult = {}

    catchresult['error'] = err
    catchresult['status'] = 'error'
    console.log("catch", catchresult);
    res.send(catchresult)

  }



});


router.post('/Forgotpassword', (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  if (email.length === 0) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send("plz fill the data properly");

  } else {
    try {
      const sqlNew = "SELECT * FROM users WHERE email=?"
      conn.query(sqlNew, [email], (err, result) => {
        if (result.length > 0) {
          let successresult = {}
          successresult['result'] = result
          successresult['status'] = 'success'
          console.log("success", successresult);
          res.send(successresult);
          const secret = JWT_SECRET;
          const payload = {
            email: email,

          };

          const token = jwt.sign(payload, secret, { expiresIn: '15m' });
          const link = `http://localhost:3001/Reset-password/${email}/${token}`;
          console.log(email);
          console.log(token);
          console.log(link);
          sendMail(email, token)
            .then((result) => console.log('Email sent...', result))
            .catch((error) => console.log(error.message));

        }
        else {
          let errorresult = {}
          errorresult['error'] = err
          errorresult['status'] = 'error'
          console.log("else part", errorresult);
          res.send(errorresult)

        }




      });
    } catch (err) {
      let catchresult = {}

      catchresult['error'] = err
      catchresult['status'] = 'error'
      console.log("catch", catchresult);
      res.send(catchresult)
    }
  }


});




//  router.post('/Forgotpassword/:email/:token',(req,res,next) => {
//     const { email ,password} = req.body;
//     console.log(req.body);
//     const sqlShow1 = "SELECT * FROM users WHERE email=? password=? "
//     conn.query(sqlShow1, [email,password], (err, result) => {
//     // if(email!== email){
//     //     res.send('User not registered');
//     //     return;
//     // }

//     const secret = JWT_SECRET + {password};
//     const payload ={
//         email: {email},

//     };
//     const token = jwt.sign(payload, secret, { expiresIn: '15m'});
//     const link = `http:localhost:5000/Reset-password/${email}/${token}`;
//     console.log(link);
//     //res.send('password reset link has been sent to your email...');

//  });
// });



router.post('/Reset-password/:email/:token', (req, res, next) => {
  const { email, token } = req.params;
  console.log("hii");
  const { password } = req.body;
  console.log(req.body);



  const sqlShow2 = `UPDATE users SET password=? WHERE email=?`;
  conn.query(sqlShow2, [password, email], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {

      const secret = JWT_SECRET;
      try {
        const payload = jwt.verify(token, secret);
        console.log(payload);


        //res.send("password updated success");
        res.render('Reset-password', { email: jwt.verify.email, status:"verified" });

      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
      //res.send(result);
    }

    // const secret = JWT_SECRET;
    // try {
    //   const payload = jwt.verify(token, secret);
    //   console.log(payload);


    //   res.send("password updated success");
    //   res.render('Reset-password', { email: jwt.verify.email, status: "verified" });

    // } catch (error) {
    //   console.log(error.message);
    //   res.send(error.message);
    // }


  });


});





module.exports = router;





