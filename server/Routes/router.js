const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const bcrypt = require('bcrypt');
// const hashedPass=''


// register user data
router.post("/create", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  
  const hashedPass = await bcrypt.hash(req.body.password, salt)

  console.log("himan", hashedPass);
  const { file, firstName, lastName, gender, email, securityQuestion, securityAnswer} = req.body;

  if (!file || !firstName || !lastName || !gender || !email || !securityQuestion || !securityAnswer || !hashedPass) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send("plz fill the data properly");

  }
  else {
    try {
      conn.query("SELECT * FROM users WHERE email =? OR securityAnswer=?", [email, securityAnswer], (err, result) => {
        if (result.length) {
          if (result[0].email === email) {
            const errorresult = {}
            errorresult['error'] = err
            errorresult['status'] = 'email error'
            console.log("already registered with this mail ", errorresult);
            res.send(errorresult)

          }
          else if (result[0].securityAnswer === securityAnswer) {
            const errorresult = {}
            errorresult['error'] = err
            errorresult['status'] = 'securityAnswer error'
            console.log("Enter Unique Security Answer", errorresult);
            res.send(errorresult)
          }
        }
        else {


          const sqlInsert = "INSERT INTO users (file,firstName,lastName,gender,email,securityQuestion,securityAnswer,password,confirmPassword) VALUES (?,?,?,?,?,?,?,?,?)";


          conn.query(sqlInsert, [file, firstName, lastName, gender, email, securityQuestion, securityAnswer, hashedPass, hashedPass], (err, result) => {
            const successresult = {}
            successresult['result'] = result
            successresult['status'] = 'success'
            console.log("success", successresult);
            res.send(successresult);
            console.log(successresult);
            console.log(hashedPass);
          }
          )

        }
      })
    } catch (err) {
      const catchresult = {}

      catchresult['error'] = err
      catchresult['status'] = 'error'
      console.log("catch", catchresult);
      res.send(catchresult)

    }
  }
})




// // // login 
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send("plz fill the data properly");

  } else {
    try {
      
      const sqlShow = "SELECT * FROM users WHERE email=? "
      conn.query(sqlShow, [email], async (err, result) => {
        let validPassword =await bcrypt.compare(req.body.password, result[0].password);
        console.log(req.body.password)
        console.log(result[0].password)
        console.log(validPassword,"succesful")
        if(validPassword==false){
          res.send("invalid Password")
        }
      
        
       else if (result.length > 0) {
          let successresult = {}
          successresult['result'] = result
          successresult['status'] = 'success'
          console.log("success", successresult);
          console.log("result", result)
          res.send(successresult);
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

router.post('/Reset-password/:email/:token', async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass1 = await bcrypt.hash(req.body.password, salt)
  console.log("himanshu", hashedPass1);
  const { email, token } = req.params;
  console.log("hii");
  const { password } = req.body;
  console.log(req.body);



  const sqlShow2 = `UPDATE users SET password=? WHERE email=?`;
  conn.query(sqlShow2, [hashedPass1, email], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }

    const secret = JWT_SECRET;
    try {
      const payload = jwt.verify(token, secret);
      console.log(payload);


      res.send("password updated success");
      res.render('Reset-password', { email: email });

    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }


  });


});



module.exports = router;













