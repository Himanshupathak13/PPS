import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Register() {
    useEffect(() => {
        const auth = localStorage.getItem('new');
        if (auth) {
            navigate('/Profile');
        }

    },[])
    const initialValues = { file: "", firstName: "", lastName: "", gender: "", email: "", securityQuestion: "", securityAnswer: "", password: "", confirmPassword: "" };
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordValidator = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(false);
    const [emailValidation,setEmailValidation]=useState(false);
    const [passwordValidation,setPasswordValidation] = useState(false);
    const [confirmValidation,setConfirmValidation] = useState(false);
    //const [imagePath, setPath] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const ImageUpload = (e) => {
        console.log(e.target.files[0]);
        setFormValues({ ...formValues, file: e.target.files[0] });

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValues.file) {
            setFormErrors(true);
            return false;
        }
        if (!formValues.firstName) {
          setFormErrors(true);
            return false;
         }
        if (!formValues.lastName) {
            setFormErrors(true);
            return false;
        }
        if (!formValues.email) {
            setFormErrors(true);
            return false;
        }
        if(!emailValidator.test(formValues.email)) {
            setEmailValidation(true);
                return false;
         }
        if (!formValues.gender) {
             setFormErrors(true);
            return  formErrors.gender;
        }
        if (!formValues.password) {
           setFormErrors(true);
            return false;
        } 
        if (!passwordValidator.test(formValues.password)) {
            setPasswordValidation(true);
                return false;
        }
         if (!formValues.confirmPassword) {
             setFormErrors(true);
            return false;
        } 
        if (formValues.password !==formValues.confirmPassword) {
           setConfirmValidation(true);
                return false;
        }
        if (!formValues.securityQuestion) {
            setFormErrors(true);
            return false;
            
        }
        if (!formValues.securityAnswer) {
            setFormErrors(true);
             return false;
            
        }
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
                navigate("/Login");
                //localStorage.setItem("new", JSON.stringify(response.data.result));
                
            }
            else if (response.data.status === "error") {
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
                                    onChange={ImageUpload} />
                            </div>
                            {formErrors && !formValues.file && <p className='text-center alert-danger'>Upload image</p>}

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
                            {formErrors && !formValues.firstName && <p className='text-center alert-danger'>First Name is required</p>}

                            

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
                            {formErrors && !formValues.lastName && <p className='text-center alert-danger'>Last Name is required</p>}


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
                            {formErrors && !formValues.gender && <p className='text-center alert-danger'>Gender is required</p>}

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
                            {formErrors && !formValues.email ?<p className='text-center alert-danger'>Email is required</p>:""}
                            {emailValidation && <p className='text-center alert-danger'>This is not a valid format</p>}


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
                            {formErrors && !formValues.securityQuestion && <p className='text-center alert-danger'>Security Question is required</p>}


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
                            {formErrors && !formValues.securityAnswer && <p className='text-center alert-danger'>Unique Security Answer is required</p>}


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
                            {formErrors && !formValues.password && <p className='text-center alert-danger'>Password is required</p>}
                            {passwordValidation && <p className='text-center alert-danger'>Password must not contain Whitespaces and should contain at least one uppercase,one lowercase,one special,one digit and password should be the length of 10-16 characters</p>}


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
                            {formErrors && !formValues.confirmPassword && <p className='text-center alert-danger'>Confirm Password is required</p>}
                            {confirmValidation && <p className='text-center alert-danger'>Password and Confirm password should be same</p>}



                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Register</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div >
        </div >


    )
}
export default Register;

 //setPath(process.env.REACT_APP_FILE_PATH+formValues.file);
        //setIsSubmit(true);

 /* 
                            {Object.keys(formErrors).length === 0 && isSubmit ? (
                                <div className="text-center alert alert-success">REGISTERED SUCCESSFULLY </div>
                            ) : (<pre className="text-left justify-content">{JSON.stringify(formValues, undefined, 2)}</pre>
                            )} */

                            // useEffect(() => {

    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(formValues);
    //     }
       
    // }, [formErrors]);










