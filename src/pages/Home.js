import React from 'react';
import { Link } from 'react-router-dom';
import { ImLocation } from "react-icons/im";
import { BsBuilding } from "react-icons/bs";



const Home = () => {
    return (
            <div>
                <div className="home-container" >
                <h1 className="title" >Locations App</h1>
                    <Link to="/locations" className="home-link">
                        <p className="header-link-home"><ImLocation /> LOCATIONS</p>
                    </Link>
                    <Link to="/cities" className="home-link">
                        <p className="header-link-home"><BsBuilding /> CITIES</p>
                    </Link>
                </div>
            </div>
    )
}

export default Home
