import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Card from '../Card'
import Footer from '../Footer'

const Home = () => {
    const [search, setsearch] = useState("")
    const [foodCat, setfoodCat] = useState([]);
    const [food_item, setfood_item] = useState([]);


    const loadData = async () => {
        let response = await fetch("https://go-food-backend.onrender.com/api/fooddata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }

        });
        response = await response.json();
        setfood_item(response[0]);
        setfoodCat(response[1])
    }
    useEffect(() => {
        loadData();


    }, [])


    return (

        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ "zIndex": "10" }}>

                        <div className="d-flex justify-content-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" value={search} onChange={(e) => setsearch(e.target.value)} aria-label="Search" />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://loremflickr.com/900/700/biryani" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?Pizza" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?Salad" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            </div>
            

            <div className='container'>{
                foodCat !== [] ? foodCat.map((data) => {
                    return (
                        <div className='row'>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {food_item !== [] ?
                                food_item.filter((item) =>
                                    item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                ).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 col-12' >
                                            <Card foodItems={filterItems} options={filterItems.options[0]} />
                                            
                                        </div>
                                    )
                                }) : "No Data"
                            }
                        </div>
                    )

                }) : "No Data"
            }    </div>


            <div><Footer /></div>


        </div>
    )
}

export default Home
