import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Forgotpassword() {
    const initialValues = { email: ""};
    const [formValues, setFormValues] = useState(initialValues);

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        axios.post("http://localhost:3001/forget", {

            email: formValues.email,

        }).then((response) => {
            console.log(response)
            if (response.data.status ==="success") {
                alert("email id is: "+response.data.result[0].email)
                alert("password is: "+response.data.result[0].password);
            
            }
            else{
                console.log(response);
                alert('no data');
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
        if (!values.email) {
            errors.email = "";
        }
        
        return errors;
    };
    return (
        <div className="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

                <h4 className="p-2 mt-5">WELCOME TO FORGET PASSWORD PAGE</h4>

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
                                    placeholder="Type your Email"
                                    value={formValues.email}
                                    onChange={handleChange} />
                                
                            </div>
                            <p>{formErrors.email}</p>

                            <div className='mb-3 m-2 text-center form-group'>
                                <button className="btn btn-warning text-center">Got your password</button>
                            </div>
                            
                        {Object.keys(formErrors).length === 0 && isSubmit ? (
                            <div className=""></div>
                        ) : (
                            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                        )}
                       

                        </form>
                        

                    </div>
                </div>




            </div >

        </div>





    )
}

export default Forgotpassword;