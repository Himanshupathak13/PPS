import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem('new');
  const idproduct = JSON.parse(localStorage.getItem('new')).id;
  const params = useParams();

  useEffect(() => {
    getProducts();
  }, [])
  
  const getProducts = async () => {
    const result = await fetch('http://localhost:3001/userdashboard',{
      method:'post',
      body:JSON.stringify({idproduct}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await result.json();
    setProducts(data);
  }

  
    const doDelete = async (uploadfile) => {
      console.log(uploadfile)
      const newresult = await fetch(`http://localhost:3001/userdashboard/${uploadfile}`, {
        method: "Delete"
      });
      const newdata = await newresult.json();
      if (newdata) {
        getProducts();
      }
    }

    
  const dodownload = async (uploadfile) => {
    const result = await axios.get(`http://localhost:3001/download/${uploadfile}`, {
        method: "get",
        responseType: 'blob'
      })
    } 
  
  
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      <script src="sweetalert.min.js"></script>

      <section className="text-center bg-warning m-2 mt-2 p-2 d-flex aligns-items-center justify-content-md-center ">
        <h4 className="p-2 mt-5">Welcome to User Dashboard Page</h4>
      </section>

      <div className='product-list'>
        <ul >
          <li>S.No.</li>
          <li>Upload file</li>
          <li>Message</li>
          <li>Operation</li>
        </ul>
        {
          products.length > 0 ? products.map((items, index) =>
            <ul>
              <li>{index + 1}</li>
              <li>{items.uploadfile}</li>
              <li>{items.message}</li>
              <li className='m-1 p-0'>
                <button onClick={(e)=>dodownload} className='m-1 p-0'>Download</button>
                <button onClick={(e)=>doDelete} className='m-1 p-0'>Delete</button>
              </li>
            </ul>
          )
            : <h1>No Result Found</h1>
        }
       

      </div>
    </div >
  )
}


export default UserDashboard;