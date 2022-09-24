const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const jwt = require('jsonwebtoken');
const { sendMail } = require('../app2')
const JWT_SECRET = 'some super secret'
const multer = require('multer');
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRound = 10;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits:{
       fileSize:1024*1024*5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/avif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
//register user data
router.post("/create", upload.single("file"), async(req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt)
  console.log(hashedPass);
  const file = (req.file) ? req.file.filename : null;
  console.log(req.file);
  console.log(req.file.filename);
  const {
    firstName, lastName, gender, email, securityQuestion, securityAnswer } = req.body;
  if (!file || !firstName || !lastName || !gender || !email || !securityQuestion || !securityAnswer || !hashedPass ) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send(dataerror);

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
            successresult['result'] = req.body;
            successresult['status'] = 'success'
            console.log("success", successresult);
            console.log(req.body);
            res.send(successresult);
          }

          )

        }

      });
    } catch (err) {
      const catchresult = {}

      catchresult['error'] = err
      catchresult['status'] = 'error'
      console.log("catch", catchresult);
      res.send(catchresult)

    }
  }

});

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
        console.log(validPassword,"successful")
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


router.post('/loginadmin', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send("plz fill the data properly");

  } else {
    try {
      
      const sqlShow = "SELECT * FROM admin WHERE username=? AND password=? "
      conn.query(sqlShow, [username, password], async (err, result) => {
        if (result.length > 0) {
          let successresult = {}
          successresult['result'] = result
          successresult['status'] = 'success'
          console.log("success", successresult);
          console.log("result", result)
          res.send(successresult);
        } 
        else{
            const errorresult = {}
            errorresult['error'] = err
            errorresult['status'] = 'error'
            console.log("error", errorresult);
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

const data = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, './public/uploadfile/')
  },
  filename: (req,file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadfile = multer({
  storage: data,
  limits:{
       fileSize:1024*1024*5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "application/doc" || file.mimetype == "application/xsl" ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .doc, .pdf and .xsl format allowed!'));
    }
  }
});
router.post('/upload',uploadfile.single("uploadfile"),(req, res) => {

  const {uploadfile = (req.file) ? req.file.filename : null,idproduct,message} = req.body;
  console.log(req.body);
  console.log(uploadfile);

  if (!idproduct || !uploadfile || !message) {
    const dataerror = {}
    dataerror['error'] = null
    dataerror['status'] = 'error'
    console.log("fill data properly", dataerror);
    res.send("plz fill the data properly");

  } else {
    try {
      const sqlProduct = "INSERT INTO products (idproduct,uploadfile,message) VALUES (?,?,?)";
      conn.query(sqlProduct, [idproduct,uploadfile, message], (err, result) => {
        const successresult = {}
        successresult['result'] = req.body;
        successresult['status'] = 'success'
        console.log("success", successresult);
        console.log(result);
        res.send(successresult);
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

router.get('/showfile',async(req,res)=>{

    try {
      const sqlShow = "SELECT * FROM products";
      conn.query(sqlShow,(err, result) => {
        if (result.length> 0) {
          let successresult = {}
          successresult['result'] = result
          successresult['status'] = 'success'
          console.log("success", successresult);
          res.send(result);
          console.log(successresult)
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

router.post('/Reset-password/:email/:token', async(req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass1 = await bcrypt.hash(req.body.password, salt)
  console.log( hashedPass1);
  const { email, token } = req.params;
  console.log("hii");
  const { password ,confirmPassword } = req.body;
  console.log(req.body);
  if(!password || !confirmPassword){
    res.send("Please Fill password and confirmpassword same")
  }
  else{
  const sqlShow2 = `UPDATE users SET password=? WHERE email=?`;
  conn.query(sqlShow2, [hashedPass1, email], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {

      const secret = JWT_SECRET;
      try {
        const payload = jwt.verify(token, secret);
        console.log(payload);


      
        res.render('Reset-password', { email: jwt.verify.email, status:"verified" });

      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
     
    }

   

  });

  }
  
});



module.exports = router;
















