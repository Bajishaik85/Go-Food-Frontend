import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
const MyOrders = () => {


    const [orderData, setorderData] = useState({})
    const fetchMyOrder = async () => {
        await fetch("https://go-food-backend.onrender.com/api/myOrderData", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            await setorderData(response);

        })


    }
    useEffect(() => {
        fetchMyOrder()
    }, [])
    return (
        <>
            <div><Navbar /></div>

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.order_data ?
                                data.order_data.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        
                                        item.map((arrayData) => {
                                            return (
                                                <div >
                                                    
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : <h1 className='text-danger text-center m-2'>No Orders Found</h1>
                        )
                    }) : <h1 className='text-danger'>No Data Found</h1>}
                </div>


            </div>
            <Footer></Footer>
        </>

    )
}

export default MyOrders