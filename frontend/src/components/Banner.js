import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Banner.css';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [numberOfPersons, setNumberOfPersons] = useState(1); // Track the number of persons
  const [selectedMonth, setSelectedMonth] = useState(''); // Track the selected month
  const [isLoading, setIsLoading] = useState(false); // Define the loading state

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`)
        .then(response => {
          const fetchedDestinations = response.data.map(country => ({
            label: country.name.common,
            value: country.cca2,
          }));
          setSuggestions(fetchedDestinations);
        })
        .catch(error => {
          console.error('Error fetching destinations:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (destination) => {
    setSearchQuery(destination.label); // Set the selected country
    setSuggestions([]); // Clear the suggestions list
  };

  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Welcome to Viator</h1>
        <p>Your journey starts here</p>
        <div className="form-container">
          <div className="combobox-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a destination"
              className="combobox"
            />
            {isLoading && <p>Loading...</p>} {/* Show loading text */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((destination) => (
                  <li
                    key={destination.value}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(destination)} // Set query when clicked
                  >
                    {destination.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="combobox-container">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="combobox"
            >
              <option value="">Select Month</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>

          <div className="number-of-persons">
            <label>Number of People</label>
            <input
              type="number"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(Number(e.target.value))}
              min="1" // Prevent setting value lower than 1
              className="input-number"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
