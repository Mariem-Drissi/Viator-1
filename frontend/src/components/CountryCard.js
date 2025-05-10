import React from 'react';
import '../styles/CountryCard.css'; // Import the CSS file for styling

const CountryCard = ({ country, imageUrl }) => {
  return (
    <div className="country-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="country-name">{country}</div>
    </div>
  );
};

export default CountryCard;
