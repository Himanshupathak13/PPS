import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Register() {
    const initialValues = { file: "", firstName: "", lastName: "", gender: "", email: "", securityQuestion: "", securityAnswer: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [imagePath, setPath] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('new');
        if (auth) {
            navigate('/Profile');
        }

    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const ImageUpload = (e) => {
        console.log(e.target.files[0]);
        setFormValues({ ...formValues, file: e.target.files[0] });

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setPath(process.env.REACT_APP_FILE_PATH.file);
        setIsSubmit(true);
        const formdata = new FormData();
        formdata.append('file', formValues.file);
        formdata.append('firstName', formValues.firstName);
        formdata.append('lastName', formValues.lastName);
        formdata.append('email', formValues.email);
        formdata.append('gender', formValues.gender);
        formdata.append('securityQuestion', formValues.securityQuestion);
        formdata.append('securityAnswer', formValues.securityAnswer);
        formdata.append('password', formValues.password);
        formdata.append('confirmPassword', formValues.confirmPassword);

        axios.post("http://localhost:3001/create", formdata, {

        }).then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                swal("Congrats! " + formValues.firstName, "Successfully Registered", "success");
                navigate("/Profile");
                localStorage.setItem("new", JSON.stringify(response.data.result));
                
            }
            else if (response.data === "fill the data properly") {
                swal("Hey! Fill all the details properly", "", "error");
            }
            else {

                if (response.data.status === "email error") {
                    swal('Already Registered User Go to Login Page', "", "warning");
                }
                else if (response.data.status === "securityAnswer error") {
                    swal('Give unique answer of your security Answer', "", "warning");
                }
            }
        });

    };
    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
        else {
            console.log(formErrors);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordValidator = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
        if (!values.file) {
            errors.file = "Upload image";

        }
        if (!values.firstName) {
            errors.firstName = "First Name is required";

        }
        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else {
            if (!emailValidator.test(values.email)) {
                errors.email = "This is not a valid email format!";
            }
        }
        if (!values.gender) {
            errors.gender = "Gender is required";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        } else {
            if (!passwordValidator.test(values.password)) {
                errors.password = "Password must not contain Whitespaces and should contain at least one uppercase,one lowercase,one special,one digit and password should be the length of 10-16 characters";
            }
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else {
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password and Confirm Password should be same";
            }
        }
        if (!values.securityQuestion) {
            errors.securityQuestion = "Security Question is required";
        }
        if (!values.securityAnswer) {
            errors.securityAnswer = "Unique Security Answer is required";
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
                                <label>Upload Image</label>
                                <input
                                    className='form-control text-center'
                                    type="file"
                                    name="file"
                                    placeholder="Upload Image"
                                    accept=".png, .jpg, .jpeg"
                                    value={imagePath.file}
                                    onChange={ImageUpload} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.file}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>First Name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formValues.firstName}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.firstName}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Last Name</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formValues.lastName}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.lastName}</p>


                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Select Gender</label>
                                <select className='form-control text-center'
                                    name="gender"
                                    type="option"
                                    placeholder="Gender"
                                    onChange={handleChange}
                                    value={formValues.gender}>
                                    <option defaultValue>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to say">Prefer Not to Say</option>
                                </select>
                            </div>
                            <p className='text-center alert-danger'>{formErrors.gender}</p>

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
                            <p className='text-center alert-danger'>{formErrors.email}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Select Security Question</label>
                                <select className='form-control text-center'
                                    name="securityQuestion"
                                    type="option"
                                    placeholder="Select Security Question"
                                    onChange={handleChange}
                                    value={formValues.securityQuestion}>
                                    <option defaultValue>Select Security Question</option>
                                    <option value="What is your school name?">What is your school name?</option>
                                    <option value="What is your pet name?">What is your pet name?</option>
                                    <option value="Which is your favourite place?">Which is your favourite place?</option>
                                    <option value="Which is your favourite sport?">Which is your favourite sport?</option>
                                    <option value="Who is your best friend?">Who is your best friend?</option>
                                </select>
                            </div>
                            <p className='text-center alert-danger'>{formErrors.securityQuestion}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Answer of Security Question</label>
                                <input
                                    className='form-control text-center'
                                    type="text"
                                    name="securityAnswer"
                                    placeholder="Security Answer"
                                    value={formValues.securityAnswer}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.securityAnswer}</p>

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
                            <p className='text-center alert-danger'>{formErrors.password}</p>

                            <div className="field mb-3 m-2 text-center form-group">
                                <label>Confirm Password</label>
                                <input
                                    className='form-control text-center'
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange} />
                            </div>
                            <p className='text-center alert-danger'>{formErrors.confirmPassword}</p>


                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Register</button>
                            </div>

                            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                                <div className="text-center alert alert-success">REGISTERED SUCCESSFULLY </div>
                            ) : (<pre className="text-left justify-content">{JSON.stringify(formValues, undefined, 2)}</pre>
                            )} */}



                        </form>
                    </div>
                </div>
            </div >
        </div >


    )
}
export default Register;













