const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
require("./db/conn");
const router = require("./Routes/router");
const jwt = require('jsonwebtoken');
require("./app2");


const JWT_SECRET = 'some super secret'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(router);
app.set('view engine', 'ejs');


app.get("/",(req,res)=> {
    res.send("Hello from the express");
});

// app.get('/Forgot-password',(req,res,next) => {
//     res.render('Forgot-password');
//  });

 app.get('/Reset-password/:email/:token',(req,res,next) => {
    const { email, token } = req.params;
    console.log(req.params);
    
    

    const secret = JWT_SECRET ;
    try {
      const payload = jwt.verify(token, secret);
      console.log(payload);
      res.render('Reset-password',{email: email});
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
       
    }
 });
   

app.listen(3001, () => {
    console.log("Running on port 3001");
});
