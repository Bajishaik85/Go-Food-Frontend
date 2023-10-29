import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "", });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://go-food-backend.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (!json.success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Credentials!',
      })
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged In Successfully',
        showConfirmButton: false,
        timer: 1500
    })
      navigate("/")
    }
  }

  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div>
      <div className='container'>


        <form onSubmit={handleSubmit} autocomplete="off">

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChangeHandler} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChangeHandler} required />
          </div>


          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 btn btn-danger">New User</Link>

        </form>
      </div>

    </div>
  )
}

export default Login