import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import pg2 from './pg2.avif';
import Card from 'react-bootstrap/Card';

const Profile = () => {
    const auth2 = localStorage.getItem('admin');

    const navigate = useNavigate();
    useEffect(() => {
        if (auth2) {
            navigate('/AdminProfile');
        }

    }, []);
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">
                <h4 className="p-2 mt-5">WELCOME ADMIN!</h4>
            </section>
            <div className='text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center'>
                <Card style={{ width: '18rem' }} className="text-center m-5 mt-5 pt-5 p-2 d-flex aligns-items-center justify-content-md-center ">
                    <Card.Img variant="top" src={pg2} alt={pg2} />
                    <Card.Body>
                        <Card.Title>Hii I'm </Card.Title>
                        <Card.Title>{JSON.parse(auth2).username}</Card.Title>
                    </Card.Body>

                </Card>
            </div>
        </>
    )
}





export default Profile;