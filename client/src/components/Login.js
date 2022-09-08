import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);


    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('new');
        if (auth) {
            navigate('/Profile');
        }

    }, []);


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
            if (response.data.status === "success") {
                swal("Congrats! " + formValues.email, "Successfully logged in", "success");
                localStorage.setItem("new", JSON.stringify(response.data.result[0]));
                navigate("/Profile");


            }
            else if (response.data === "plz fill the data properly") {
                swal("Hey! Fill all the details properly", "", "error")

            }
            else {
                console.log(response);
                swal('wrong username/password', "", "error");
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
        }

        return errors;

    };
    return (
        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            <script src="sweetalert.min.js"></script>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO LOGIN PAGE</h4>

            </section>
            <div class="container mt-5 ">
                <div className="row aligns-items-center justify-content-center">
                    <div className="col-sm-4">
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
                            <p className='text-center alert-danger'>{formErrors.email}</p>

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
                            <p className='text-center justify-content alert-danger'>{formErrors.password}</p>

                            <div className="row justify-content-end">
                                <div className='col-3'>
                                    <button className="btn btn-warning ml-2">Login</button>
                                </div>
                                <div className='col-auto'>
                                    <Link to="/Forgotpassword" className="">Forgot Password?</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>




            </div >

        </div>





    )
}

export default Login;