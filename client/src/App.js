import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from "../src/components/NavBar";
import FetchNews from './components/FetchNews';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Footer from './components/Footer';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import PrivateComponent from './components/PrivateComponent';


function App() {

  return (
    <div className='App'>
    <Router>

      <NavBar />

      <Routes>

        <Route element={<PrivateComponent/>}>
        
        <Route path="/FetchNews" element={<FetchNews />} />
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="*" element={<PageNotFound/>} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />} /> 

        </Routes>
    
      </Router>
      <Footer/>

    </div>
  );
}

export default App;
