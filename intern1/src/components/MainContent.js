import React from 'react'
import { Link } from 'react-router-dom';
import image from './image.jpg'

import Navbar from 'react-bootstrap/Navbar';

const MainContent = () => {

    return (
        <div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO OUR PPS WEBSITE</h4>

            </section>
            <div className='m-2 p-2 ml-2 border-5 border border-dark w-100%' >
            <img src={image} className="w-100"/>
            </div>

        </div>
    )
}

export default MainContent;