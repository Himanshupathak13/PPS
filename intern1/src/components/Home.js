import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MainContent from './MainContent';


const Home = () => {

    return (

        <div>
        
        <MainContent/>

        </div>
    )

}
export default Home;