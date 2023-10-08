// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import Home from "./front_page";
import CountryChart from "./single_country_search_page";
import CountryDataComparison from "./countries_comparison_page";
import "./styles.css";
import FileUpload from "./file_upload";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/CountryChart" activeClassName="active">
                Country Population
              </NavLink>
            </li>
            <li>
              <NavLink to="/CountryComparison" activeClassName="active">
                Country Comparison
              </NavLink>
            </li>
            <li>
              <NavLink to="/FileUpload" activeClassName="active">
                Upload Your Data
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/FileUpload" element={<FileUpload />} />
          <Route
            path="/CountryComparison"
            element={<CountryDataComparison />}
          />
          <Route path="/CountryChart" element={<CountryChart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
