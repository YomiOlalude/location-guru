import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateCity extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
                cities: [],
                locations: [],
                name: "",
                code: 0,
                timeAdded: "",
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleCreateCityButtonPressed = (event) => {
        event.preventDefault()
        const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        
        body: JSON.stringify({
                    name: this.state.name,
                    locations: this.state.locations,
                    code: this.state.code,
                    time_added: this.state.timeAdded,
                }),
            };

        fetch("https://api.photodino.com/locations/cities/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let newCities = [this.props.cities.unshift(data)]
                this.setState({
                    cities: newCities,
                }, this.props.onAddCity)
            })
     }

    render() {
    
    return (
        <section className="location-section">
            <h3 className="new-location-title">Create New City</h3>
            <div className="new-city-container">
                <div className="new-location-wrap">
                    <label htmlFor="name" >
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="locations" >
                        Locations
                    </label>
                    <input type="text" name="locations" id="locations" value={this.state.locations} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
                <div className="new-location-wrap">
                    <label htmlFor="code" >
                        Code
                    </label>
                    <input type="number" name="code" id="code" value={this.state.code} onChange={this.handleInputChange} className="new-location-input">
                    </input>
                </div>
            </div>
                <center><button className="new-location-button" onClick={this.handleCreateCityButtonPressed}>Add City</button></center>
        </section>
        )
    }
}

CreateCity.propTypes = {
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        locations: PropTypes.string.isRequired,
    })
}

export default CreateCity;