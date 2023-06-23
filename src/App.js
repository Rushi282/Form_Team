import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./card";
import data from "./heliverse_mock_data.json";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function App() {
  const itemsPerPage = 20; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [genderFilter, setGenderFilter] = useState(""); // Gender filter
  const [dominFilter, setDominFilter] = useState(""); // Age filter
  const [availabilityFilter, setAvailabilityFilter] = useState(); // Availability filter

  // Apply filters and pagination to the data
  const filteredData = data
    .filter((player) => (genderFilter ? player.gender === genderFilter : true))
    .filter((player) => (dominFilter ? player.domain === dominFilter : true))
    .filter((player) =>availabilityFilter ? player.available === availabilityFilter : true
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle filter selection
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1); // Reset page to 1 when changing filters
    if (filterType === "gender") {
      setGenderFilter(value);
    } else if (filterType === "domin") {
      setDominFilter(value);
    } else if (filterType === "availability") {
      setAvailabilityFilter(value);
    }
  };

 const [team, setTeam] = useState([]);

//  const handleclick = (player) => {
//    console.log("poped");
//    setTeam([...team, player]); // Create a new array by spreading the existing team array and adding the new player
//    console.log(team);
//  };

 const [teams, setTeams] = useState([]);
 const [currentTeam, setCurrentTeam] = useState([]);

 const handleAddTeam = () => {
   setTeams([...teams, currentTeam]);
   setCurrentTeam([]);
 };

 const handleclick = (player) => {
   setCurrentTeam([...currentTeam, player]);
 };

 const removePlayer = (team,player) => {
   const updatedTeam = team.filter((p) => p.id !== player.id);
   setCurrentTeam(updatedTeam);
 };

  return (
    <div className="App">
      <h1>Team preprations</h1>
      <div className="row">
        <div className="col-xl-6">
          <h3>Candidates</h3>
          <br />
          <div className="row">
            {/* Filter selection */}
            <div className="filters">
              <label>Gender:</label>
              <select
                value={genderFilter}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Domain:</label>
              <select
                value={dominFilter}
                onChange={(e) => handleFilterChange("domin", e.target.value)}
              >
                <option value="">All</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>

              <label>Availability:</label>
              <select
                value={availabilityFilter}
                onChange={(e) =>
                  handleFilterChange("availability", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <br />
            <hr />

            {/* Render filtered items */}
            {currentItems.map((player) => (
              <div onClick={() => handleclick(player)}>
                <Card
                  key={player.id}
                  name={player.first_name}
                  lastname={player.last_name}
                  gender={player.gender}
                  emailId={player.email}
                  available={player.available}
                  domain={player.domain}
                  avatar={player.avatar}
                />
              </div>
            ))}

            {/* Pagination buttons */}
            <div className="pagination">
              <Pagination
                filteredData={filteredData}
                handlePageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row">
            <h3>teams</h3>
            {teams.map((team, index) => (
              <div key={index}>
                <h4>Team {index + 1}</h4>
                <div>
                  {team.map((player) => (
                    <div key={player.id}>
                      <button
                        className="btn btn-danger"
                        onClick={() => removePlayer(team,player)}
                      >
                        Delete
                      </button>
                      <Card
                        name={player.first_name}
                        lastname={player.last_name}
                        gender={player.gender}
                        emailId={player.email}
                        available={player.available}
                        domain={player.domain}
                        avatar={player.avatar}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleAddTeam}>Add Team</button>
        </div>
      </div>
    </div>
  );
}

export default App;
