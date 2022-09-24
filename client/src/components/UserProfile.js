import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import pg2 from './pg2.avif';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const UserProfile = () => {
    const auth = localStorage.getItem('new');
    const src = `http://localhost:3001/public/upload/${JSON.parse(auth).file}`;
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('new');
        if (auth) {
            navigate('/UserProfile');
        }

    }, []);
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">
                <h4 className="p-2 mt-5">WELCOME TO YOUR PROFILE PAGE</h4>
            </section>
            <div className='text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center'>
                <Card style={{ width: '18rem' }} className="text-center m-5 mt-5 pt-5 p-2 d-flex aligns-items-center justify-content-md-center ">
                    <Card.Img variant="top" src={src} alt={pg2} />
                    <Card.Body>
                        <Card.Title>{JSON.parse(auth).firstName}</Card.Title>
                        <Card.Title>{JSON.parse(auth).lastName}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{JSON.parse(auth).gender}</ListGroup.Item>
                        <ListGroup.Item>{JSON.parse(auth).email}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}





export default UserProfile;
