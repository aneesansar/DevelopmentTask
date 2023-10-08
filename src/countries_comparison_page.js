import React, { useState } from "react";
import axios from "axios";
import BarChart from "./Components/countries_comparison_chart";

function CountryDataComparison() {
  const [countryName1, setCountryName1] = useState("");
  const [countryName2, setCountryName2] = useState("");
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = () => {
    setIsLoading(true);

    // Make API requests to get data for the specified countries
    axios
      .get(`http://localhost:8000/api/countrydata/${countryName1}/`)
      .then((response) => {
        setData1(response.data);

        axios
          .get(`http://localhost:8000/api/countrydata/${countryName2}/`)
          .then((response) => {
            setData2(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data for country 2:", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching data for country 1:", error);
        setIsLoading(false);
      });
  };

  return (
        // Frontend code to display UI elements

    <div>
      <h1>Country Data Comparison</h1>
      <input
        className="input"
        type="text"
        placeholder="Enter 1st Country"
        value={countryName1}
        onChange={(e) => setCountryName1(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter 2nd Country"
        value={countryName2}
        onChange={(e) => setCountryName2(e.target.value)}
      />
      <button className="button" onClick={handleCompare}>
        Compare
      </button>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {Object.keys(data1).length > 0 && Object.keys(data2).length > 0 && (
            <div>
              <h2>Bar Chart - Difference</h2>
              <BarChart
                countryName1={countryName1}
                countryName2={countryName2}
                data1={data1[0]}
                data2={data2[0]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CountryDataComparison;
