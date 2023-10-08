import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryChart from "./Components/single_country_chart";
import "./styles.css"; // Import a CSS file for styling

function CountryDataSearch() {
  const [countryName, setCountryName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);

    // Make an API request to get data for the specified country name
    axios
      .get(`http://localhost:8000/api/countrydata/${countryName}/`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  return (
    // Frontend code to display UI elements

    <div className="country-data-search-container">
      <h1>Country Data Search</h1>
      <input
        type="text"
        placeholder="Enter Country Name"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch} className="button">
        Search Now
      </button>

      {isLoading ? <div>Loading...</div> : <CountryChart data={data[0]} />}
    </div>
  );
}

export default CountryDataSearch;
