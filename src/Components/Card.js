import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import Swal from 'sweetalert2'

const Card = (props) => {
    let foodItem = props.foodItems
    let options = props.options;
    let priceRef = useRef();
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    let data = useCart();
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")


    const handleAddToCart = async () => {



        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;

            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated The Cart',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added To The Cart',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setsize(priceRef.current.value);

    }, [])


    return (



        <div className="card m-2" style={{ width: "16rem", maxHeight: "360px" }}>
            <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <div className='container w-100 p-0' style={{ height: "38px" }}>
                    <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={(e) => setqty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>)
                        })}
                    </select>
                    <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} style={{ select: "#FF0000" }} onChange={(e) => setsize(e.target.value)} >


                        {
                            priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>

                            })
                        }

                    </select>
                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                        {finalPrice} /-
                    </div>
                </div>
                <hr></hr>
                {localStorage.getItem("authToken") ? <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button> : <button className={`btn btn-success justify-center ms-2`}>Please Login</button>
                }

            </div>
        </div>



    )
}

export default Card