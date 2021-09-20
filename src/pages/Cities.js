import React, { Component } from 'react';
import City from '../components/City';
import CreateCity from "../components/CreateCity"

export default class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            filteredCities: [],
            locations: [],
            code: "All",
            name: "All",
            timeAdded: "",
        }
    }

    componentDidMount() {
        fetch("https://api.photodino.com/locations/cities/")
            .then(response => response.json())
            .then(cities => this.setState({
                cities: cities.reverse(),
                filteredCities: cities, 
            }))
    }

    deleteCity = (cityID) => {
        if (window.confirm("Are you sure you want to delete this Location?")) {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }

        fetch(`https://api.photodino.com/locations/cities/${cityID}`, requestOptions)
            .then((response) => {
                this.componentDidMount()
            })
        }
        
    }


    filterCities() {
        let {
            filteredCities,
            name,
            code
        } = this.state

        let tempCities = [...filteredCities]

        // filter by name 
        if (name !== "All") {
            tempCities = tempCities.filter(city => {
                // console.log(city.name);
                console.log(name);
                return city.name === name
            })
        }

        // filter by code 
           if (code !== "All") {
            tempCities = tempCities.filter(city => {
                console.log(city.code === code);
                return city.code === code
            })
        }

        this.setState({
            cities: tempCities,
        })
    }

    handleChange = (event)  => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        }, this.filterCities)
    }

    render() {

        let names = [...new Set(this.state.filteredCities.map(filteredCity => filteredCity.name))]
        names = ["All", ...names];
        names = names.map((name, index) => {
        return (
        <option value={name} key={index}>
            {name}
        </option>
         )
        })
        
        let codes = [...new Set(this.state.filteredCities.map(filteredCity => filteredCity.code))]
        codes = ["All", ...codes];
        codes = codes.map((code, index) => {
        return (
        <option value={code} key={index}>
            {code}
        </option>
         )
        })
        
        return (
            
            <section>
                <h1 className="title" >Cities</h1>
                    <CreateCity
                        cities={this.state.cities}
                        onAddCity={() => this.componentDidMount()}
                    />
                    <div className="filter-container" >  
                        <div className="form-control-container" >
                            <label htmlFor="name">
                                Name:
                            </label>
                            <select name="name" id="name" value={this.props.name}
                                className="form-control" onChange={this.handleChange}>
                                {names}
                            </select>
                        </div>
                        
                        <div className="form-control-container">
                            <label htmlFor="code">
                                Code:
                            </label>
                            <select name="code" id="code" value={this.props.code}
                                className="form-control" onChange={this.handleChange}>
                                {codes}
                            </select>
                        </div>
                    </div>

                <div className="cities" >
                    {this.state.cities.map(city => {
                        let slug = String(city.id)
                        let time = new Date(city.timeAdded)
                        let locations = city.locations.map(location => {
                            return location + " , "
                        })
                        return <City
                            key={city.id}
                            slug={slug}
                            name={city.name}
                            locations={locations}
                            code={city.code}
                            timeAdded={time.toDateString()}
                            deleteCity={() => this.deleteCity(city.id)}
                            />
                    })}
                </div>
            </section>
        )
    }
}

