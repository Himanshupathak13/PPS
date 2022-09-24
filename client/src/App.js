import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from "../src/components/NavBar";
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile';
import PageNotFound from './components/PageNotFound';
import PrivateComponent from './components/PrivateComponent';
import PrivateComponent2 from './components/PrivateComponent2';
import Upload from './components/Upload';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'



function App() {

  return (
    <div className='App'>
    <Router>

      <NavBar />

      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/UserProfile" element={<UserProfile />} /> 
        <Route path="/Upload" element={<Upload/>} />
        <Route path="/UserDashboard" element={<UserDashboard/>} />
        </Route>

        <Route element={<PrivateComponent2/>}>
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
        <Route path="/*" element={<PageNotFound/>} />

        </Routes>
    
      </Router>
      <Footer/>

    </div>
  );
}

export default App;