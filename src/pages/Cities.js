import React, { Component } from 'react';
import dataCities from "../dataCities";
import City from '../components/City';

export default class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            filteredCities: [],
            locations: [],
            code: "All",
            name: "All",
            time_added: "",
        }
    }

    componentDidMount() {
        let cities = dataCities

        this.setState({
            cities,
            filteredCities: cities,
        })
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

     deleteCity = (cityRemove) => {
        this.setState({cities: this.state.cities.filter(city => city !== cityRemove)})
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
                        let time = new Date(city.time_added)
                        let locations = city.locations.map(location => {
                            return location + " , "
                        })
                        return <City
                            key={city.id}
                            slug={slug}
                            name={city.name}
                            locations={locations}
                            code={city.code}
                            time_added={time.toDateString()}
                            deleteCity={() => this.deleteCity(city)}
                            />
                    })}
                </div>
            </section>
        )
    }
}

