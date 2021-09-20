import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateLocation extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
                locations: [],
                name: "",
                rent: 0,
                email: "",
                phone: "",
                coordinates: "",
                streetNumber: "",
                streetName: "",
                postalCode: "",
                status: "",
                timeAdded: "",
                city: 0,
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleCreateLocationButtonPressed = (event) => {
        event.preventDefault()
        const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        
        body: JSON.stringify({
                    name: this.state.name,
                    rent: this.state.rent,
                    email: this.state.email,
                    phone: this.state.phone,
                    coordinates: this.state.coordinates,
                    street_number: this.state.streetNumber,
                    street_name: this.state.streetName,
                    postal_code: this.state.postalCode,    
                    time_added: this.state.timeAdded,
                    city: this.state.city,
                }),
            };

        fetch("https://api.photodino.com/locations/locations/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let newLocations = [this.props.locations.unshift(data)]
                this.setState({
                    locations: newLocations,
                }, this.props.onAddLocation)
            })
     }

    render() {
    
    return (
        <section className="location-section">
            <h3 className="new-location-title">Create New Location</h3>
            <div className="new-location-container">
                <div className="new-location-wrap">
                    <label htmlFor="name" >
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="rent" >
                        Rent (€)
                    </label>
                    <input type="number" name="rent" id="rent" value={this.state.rent} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="email" >
                        Email
                    </label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="phone" >
                        Phone
                    </label>
                    <input type="tel" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="coordinates" >
                        Coordinates
                    </label>
                    <input type="text" name="coordinates" id="coordinates" value={this.state.coordinates} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="street-number" >
                        Street Number
                    </label>
                    <input type="text" name="streetNumber" id="street-number" value={this.state.streetNumber} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="street-name" >
                        Street Name
                    </label>
                    <input type="text" name="streetName" id="street-name" value={this.state.streetName} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="postal-code" >
                        Postal Code
                    </label>
                    <input type="text" name="postalCode" id="postal-code" value={this.state.postalCode} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="city" >
                        City
                    </label>
                    <input type="number" name="city" id="city" value={this.state.city} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
            </div>
                <center><button className="new-location-button" onClick={this.handleCreateLocationButtonPressed}>Add Location</button></center>
        </section>
        )
    }
}

CreateLocation.propTypes = {
    location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        rent: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        coordinates: PropTypes.string.isRequired,
        streetNumber: PropTypes.string.isRequired,
        streetName: PropTypes.string.isRequired,
        postalCode: PropTypes.number.isRequired,
        timeAdded: PropTypes.string.isRequired,
        city: PropTypes.number.isRequired,
    })
}

export default CreateLocation;