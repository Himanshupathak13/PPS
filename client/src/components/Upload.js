import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Upload = () => {
  const initialValues = { idproduct: "", uploadfile: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(false);
  const navigate = useNavigate();

  const idproduct = JSON.parse(localStorage.getItem('new')).id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const fileUpload = (e) => {
    console.log(e.target.files[0]);
    setFormValues({ ...formValues, uploadfile: e.target.files[0] });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.uploadfile) {
      setFormErrors(true);
      return false;
    }
    if (!formValues.message) {
      setFormErrors(true);
      return false;
    }
    const formdata = new FormData();
    formdata.append('uploadfile', formValues.uploadfile);
    formdata.append('message', formValues.message);
    formdata.append('idproduct', idproduct);

    axios.post("http://localhost:3001/upload", formdata, {

    }).then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        swal("Congrats! ", "Uploaded Successfully", "success");
        navigate('/UserDashboard');



      }
      else if (response.data === "plz fill the data properly") {
        swal("Hey! Fill all the details properly", "", "error")

      }
      else {
        swal('error', "", "error");
      }

    });

  };

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      <script src="sweetalert.min.js"></script>

      <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">

        <h4 className="p-2 mt-5">Welcome to Upload Page</h4>

      </section>
      <div class="container mt-5 ">
        <div className="row aligns-items-center justify-content-center">
          <div className="col-sm-4">
            <form onSubmit={handleSubmit}>

              <div className="field mb-3 m-2 text-center form-group">
                <label>File Name</label>
                <input
                  className='form-control text-center'
                  type="file"
                  name="uploadfile"
                  placeholder="File"
                  accept="application/pdf,application/msword,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  //value={formValues.uploadfile}
                  onChange={fileUpload} />
              </div>
              {formErrors && !formValues.uploadfile ? <p className='text-center alert-danger'>Upload file</p> : ""}

              <div className="field mb-3 m-2 text-center form-group">
                <label>Message</label>
                <input
                  className='form-control text-center'
                  type="text"
                  name="message"
                  placeholder="Message"
                  value={formValues.message}
                  onChange={handleChange} />
              </div>
              {formErrors && !formValues.message ? <p className='text-center alert-danger'>Message is required</p> : ""}

              <div className="text-center">
                <button className="btn btn-warning ml-2">Upload</button>
              </div>
            </form>
          </div>
        </div>




      </div >








    </div>
  )
}

export default Upload;