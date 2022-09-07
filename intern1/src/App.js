import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from "../src/components/NavBar";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';



function App() {

  return (

    <Router>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />} /> 
        
        


      </Routes>
    


    </Router>
  );
}

export default App;