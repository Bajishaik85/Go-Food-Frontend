import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from "react-bootstrap"
import Modal from '../Modal'
import Cart from './Screens/Cart'
import { useCart } from './ContextReducer';
import Swal from 'sweetalert2'

const Navbar = () => {
    
    let data = useCart();

    const [cartview, setcartview] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged Out Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        window.location.reload(true);

        
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">Go Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            {(localStorage.getItem("authToken")) ? <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/myorders">My Orders</Link>
                            </li> : ""}
                        </ul>
                        <div className='d-flex'>
                            {(!localStorage.getItem("authToken")) ? <><Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link> </> : <>
                                <div className='btn bg-white text-danger mx-1' onClick={() => { setcartview(true) }}>My Cart <Badge pill bg="danger">{data.length}</Badge></div>
                                {cartview ? <Modal onClose={() => setcartview(false)}><Cart></Cart></Modal> : ""}
                                <div className='btn bg-white text-success mx-1' onClick={handleLogout}>Logout</div></>}


                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar