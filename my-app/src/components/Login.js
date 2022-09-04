import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from 'react-router-dom';

// const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

function Login() {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        axios.post("http://localhost:3001/login", {
            email: formValues.email,
            password: formValues.password,

        }).then((response) => {
            console.log(response)
            if (response.data.status ==="success") {
                alert(formValues.email + " successfully logged in");
            }
            else{
                console.log(response);
                alert('failed');
            }
            
        });

    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);

        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };
    return (
        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO LOGIN PAGE</h4>

            </section>
            <div class="container mt-5 ">
                <div className="row aligns-items-center justify-content-center">
                    <div className="col-sm-4">

                        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                            <div className="ui message success"></div>
                        ) : (
                            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                        )} */}
                        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                        <form onSubmit={handleSubmit}>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Email</label>
                                <input
                                    className='form-control text-center'
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.email}</p>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.password}</p>

                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Login</button>

                            </div>
                        </form>
                        <div class="container text-center form-group">
                            <div className="row">
                                <div className="col-sm-16 ">
                                    <Link to="/Forgotpassword" className="btn btn-warning p-2 m-2">Forgot Password?</Link>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>




            </div >

        </div>





    )
}

export default Login;