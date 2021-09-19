import React, { Component } from 'react';
import { FaEuroSign, FaStreetView, FaLocationArrow, FaCity, FaAdn } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiTwotoneMail, AiFillPhone } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { IoTimer } from "react-icons/io5";
import locations from "../dataLocations";

class SingleLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slug: this.props.match.params.slug,
            locations: locations,
        }
    }

    getLocation = (slug) => {
        let tempLocations = [...this.state.locations];
        const place = tempLocations.find((location) => location.id === Number(slug));
        return place;
    }

    render() {

        let location = this.getLocation(this.state.slug)
        console.log(location);
        
    return (
        <div className="location-container">
            <h1>{location.name} Details</h1>
            <div>
                <ImLocation className="icon" />
                <p className="single-page-name" >Name</p>
                <p className="single-page-value">{location.name}</p>
            </div>
            <div>
                <FaEuroSign className="icon" />
                <p className="single-page-name" >Rent</p>
                <p className="single-page-value">€{location.rent}</p>
            </div>
            <div> 
                <AiTwotoneMail className="icon" />
                <p className="single-page-name" >Email</p>
                <p className="single-page-value">{location.email}</p>
            </div>
            <div>
                <AiFillPhone className="icon" />
                <p className="single-page-name" >Phone</p>
                <p className="single-page-value">{location.phone}</p>
            </div>
            <div>
                <BiCurrentLocation className="icon" />
                <p className="single-page-name" >Coordinates</p>
                <p className="single-page-value">{location.coordinates}</p>
            </div>
            <div>
                <FaLocationArrow className="icon" />
                <p className="single-page-name" >Postal Code</p>
                <p className="single-page-value">{location.postal_code}</p>
            </div>
            <div>
                <IoTimer className="icon" />
                <p className="single-page-name" >Time Added</p>
                <p className="single-page-value">{location.time_added}</p>
            </div>
            <div>
                <FaAdn className="icon" />
                <p className="single-page-name" >Availability</p>
                <p className="single-page-value">{location.status}</p>
            </div>
            <div>
                <FaStreetView className="icon" />
                <p className="single-page-name" >Address</p>
                <span className="single-page-value">No. {location.street_number}, </span>
                <span className="single-page-value">{location.street_name}</span>
            </div>
            <div>
                <FaCity className="icon" />
                <p className="single-page-name" >City</p>
                <p className="single-page-value">{location.city}</p>
            </div>
        </div>
        )
    }
}

export default SingleLocation
