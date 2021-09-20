import React, { Component } from 'react';
import { FaEuroSign, FaStreetView, FaLocationArrow, FaCity, FaAdn } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiTwotoneMail, AiFillPhone } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { IoTimer } from "react-icons/io5";

class SingleLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            locations: [],
            location: {},
        }
    }

    getLocation = (slug, locations) => {
        const place = locations.find((location) => location.id === Number(slug));
        return place;
    }

    componentDidMount() {
        fetch("https://api.photodino.com/locations/locations/")
            .then(response => response.json())
            .then(locations => {
              let place = this.getLocation(this.state.slug, locations)
                this.setState({
                    locations: locations,
                    location: place,
                })
            })
    } 

    render() {
        
    return (
        <div className="location-container">
            <h1>{this.state.location.name} Details</h1>
            <div>
                <ImLocation className="icon" />
                <p className="single-page-name" >Name</p>
                <p className="single-page-value">{this.state.location.name}</p>
            </div>
            <div>
                <FaEuroSign className="icon" />
                <p className="single-page-name" >Rent</p>
                <p className="single-page-value">€{this.state.location.rent}</p>
            </div>
            <div> 
                <AiTwotoneMail className="icon" />
                <p className="single-page-name" >Email</p>
                <p className="single-page-value">{this.state.location.email}</p>
            </div>
            <div>
                <AiFillPhone className="icon" />
                <p className="single-page-name" >Phone</p>
                <p className="single-page-value">{this.state.location.phone}</p>
            </div>
            <div>
                <BiCurrentLocation className="icon" />
                <p className="single-page-name" >Coordinates</p>
                <p className="single-page-value">{this.state.location.coordinates}</p>
            </div>
            <div>
                <FaLocationArrow className="icon" />
                <p className="single-page-name" >Postal Code</p>
                <p className="single-page-value">{this.state.location.postal_code}</p>
            </div>
            <div>
                <IoTimer className="icon" />
                <p className="single-page-name" >Time Added</p>
                <p className="single-page-value">{this.state.location.time_added}</p>
            </div>
            <div>
                <FaAdn className="icon" />
                <p className="single-page-name" >Availability</p>
                <p className="single-page-value">{this.state.location.status}</p>
            </div>
            <div>
                <FaStreetView className="icon" />
                <p className="single-page-name" >Address</p>
                <span className="single-page-value">No. {this.state.location.street_number}, </span>
                <span className="single-page-value">{this.state.location.street_name}</span>
            </div>
            <div>
                <FaCity className="icon" />
                <p className="single-page-name" >City</p>
                <p className="single-page-value">{this.state.location.city}</p>
            </div>
        </div>
        )
    }
}

export default SingleLocation
