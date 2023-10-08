import React, { useEffect, useState } from "react";
import "../styles.css"; // Import the CSS file
import axios from "axios";

function DataDisplay() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API to fetch data from the Django Backend.
    const apiUrl = "http://localhost:8000/api/countrydata/";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Array for yearly data growth of a country
  const years = [
    "1960",
    "1961",
    "1962",
    "1963",
    "1964",
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
  ];

  return (
    // Frontend code to display UI elements 
    <div>
      <h1>World Development Indicator</h1>
      {data.map((item) => (
        <div key={item.id} className="mb-4">
          <h2 className="h2">{item.CountryName}</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Country Name</th>
                <th>Country Code</th>
                <th>Indicator Name</th>
                <th>Indicator Code</th>
                {years.map((year) => (
                  <th key={year}>{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.CountryName}</td>
                <td>{item.CountryCode}</td>
                <td>{item.IndicatorName}</td>
                <td>{item.IndicatorCode}</td>
                {years.map((year) => (
                  <td key={year}>{item.YearlyData[year]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default DataDisplay;
