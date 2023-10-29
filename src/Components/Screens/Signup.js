import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://go-food-backend.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'

      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json();
    
    if (json.success) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Account Created Successfully',
        showConfirmButton: false,
        timer: 1500
    })
      localStorage.setItem("authToken", json.authToken)
      navigate("/login")

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Credentials!',
      })
    }

  }
  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  return (
    <div className='container'>


      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="mb-3">
          <label htmlFor="nameinput" className="form-label">Name</label>
          <input type="text" className="form-control" id="nameinput" name="name" value={credentials.name} onChange={onChangeHandler} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChangeHandler} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChangeHandler} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">Address</label>
          <input type="text" className="form-control" id="geolocation" name="geolocation" value={credentials.geolocation} onChange={onChangeHandler} required />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Existing User</Link>

      </form>
    </div>
  )
}

export default Signup