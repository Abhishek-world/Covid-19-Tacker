
import React, {useState, useEffect} from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import './Header.css';

function Header() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    useEffect(()=>{
      axios.get("https://disease.sh/v3/covid-19/countries")
      .then( response =>{
        const countries = response.data.map((country)=>(
          {
            name : country.country, //United states, United kingdom
            value : country.countryInfo.iso2 //UK, USA, FR
          }
          
        ));
        setCountries(countries);
      })
      .catch(error => console.log(error))
     } ,[]);
  
  
     const onCountryChange = (event) => {
       const countryCode = event.target.value;
       setCountry(countryCode);
     }
    return (
        <div className="header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value={country} >{country}</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value} >{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
    )
}

export default Header
