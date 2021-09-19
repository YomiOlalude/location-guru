import React from 'react';
import { Link } from 'react-router-dom';
import { ImLocation } from "react-icons/im";

const Location = (props) => {

    return (
        <div className="location" >
            <ImLocation className="building" />
            <Link to={`/locations/${props.slug}`} className="header-link">
                <h4 className="location-name" >{props.name}</h4>
            </Link>
            <p className="location-rent"> €{props.rent}</p>
            <p className="location-status">{props.status}</p>
            <p className="location-city">City: {props.city}</p>
            <button className="btn-primary" onClick={props.deleteLocation} >Delete</button>
        </div>
    )}

export default Location