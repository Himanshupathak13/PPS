import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "../src/components/Header";

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Footer from './components/Footer';


function App() {

  return (

    <Router>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
       
        <Route path="/Forgotpassword" element={<Forgotpassword />} /> 
        


      </Routes>
    
      <Footer/>


    </Router>
  );
}

export default App;