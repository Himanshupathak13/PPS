import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem('new');
  useEffect(() => {
    getProducts();
  }, [])
  const karloClick = (e) => {
    let data = `http://localhost:3001/public/uploadfile/${JSON.parse(auth).uploadfile}`;
    //<Link to=
    
  }
  const karloDownload = (e) => {
    let data = `http://localhost:3001/public/uploadfile/${JSON.parse(auth).uploadfile}`;
    //<Link to=
    
  }

  const getProducts = async () => {
    let data = await fetch('http://localhost:3001/showfile')
    const result = await data.json();
    setProducts(result);
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
          products.map((items, index) =>
            <ul>
              <li>{index + 1}</li>
              <li>{items.uploadfile}</li>
              <li>{items.message}</li>
              <li className='m-1 p-0'><button onClick={karloClick}className='m-1 p-0'>View</button>
                <button onClick={karloClick} className='m-1 p-0'>Download</button>
              </li>
            </ul>
          )
        }

      </div>
    </div >
  )
}


export default UserDashboard;



    // const deleteProduct = async (id) => {
    //   console.warn(id)
    //   let result = await fetch(`http://localhost:3001/product/${id}`, {
    //     method: "Delete"
    //   });
    //   result = await result.json();
    //   if (result) {
    //     getProducts();
    //   }
    // }

    // const searchHandle = async (event) => {
    //   let key = event.target.value;
    //   if (key) {
    //     let result = await fetch(`http://localhost:3001/search/${key}`);
    //     result = await result.json()
    //     if (result) {
    //       setProducts(result)
    //     }
    //   } else {
    //     getProducts();
    //   }
    // }