import React, { useState, useEffect } from 'react';
import axios from "axios";



function Register() {
    const initialValues = { firstName: "", lastName: "", gender: "", email: "", password: "", confirmPassword: "", fileName: "" };
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
        axios.post("http://localhost:3001/create", {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            gender: formValues.gender,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
            fileName: formValues.fileName,


        }).then((response) => {
            console.log(response);

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
        const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!emailValidator.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Password is required";
        }
        else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password is not matching.Type the password again";
        }
        if (!values.fileName) {
            errors.fileName = "Choose a file";
        }
        if (!values.gender) {
            errors.gender = "select your gender";
        }
        if (!values.firstName) {
            errors.firstName = "Fill your first name";
        }
        if (!values.lastName) {
            errors.lastName = "Fill your last name";
        }
        return errors;

    };


    return (
        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO REGISTRATION PAGE</h4>

            </section>
            <div class="container mt-5 ">
                <div className="row aligns-items-center justify-content-center">
                    <div className="col-sm-4">

                        <form onSubmit={handleSubmit}>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>first name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="firstName"
                                    placeholder="first name"
                                    value={formValues.firstName}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.firstName}</p>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>last name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="lastName"
                                    placeholder="last name"
                                    value={formValues.lastName}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.lastName}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Select gender</label>
                                <select className='form-control text-center'
                                    name="gender"
                                    type="option"
                                    placeholder="gender"
                                    onChange={handleChange}
                                    value={formValues.gender}>
                                    <option defaultValue>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                            </div>
                            <p>{formErrors.gender}</p>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Email</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.email}</p>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={formValues.password}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.password}</p>
                            <div className="field mb-3 m-2 text-center form-group">
                                <label>confirm password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirm password"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.confirmPassword}</p>


                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Upload your photo</label>
                                <input
                                    className='form-control text-center'
                                    type="file"
                                    name="fileName"
                                    value={formValues.fileName}
                                    onChange={handleChange} />
                            </div>
                            <p>{formErrors.fileName}</p>


                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Register</button>
                            </div>

                        </form>
                        {Object.keys(formErrors).length === 0 && isSubmit ? (
                            <div className="text-center">REGISTERED SUCCESSFULLY </div>
                        ) : (<pre className="text-left justify-content">{JSON.stringify(formValues, undefined, 2)}</pre>
                        )}

                    </div>
                </div>




            </div >
        </div >




    )
}
export default Register;