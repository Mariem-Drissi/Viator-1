import React from 'react';
import CountryCard from './CountryCard';
import usaImage from '../assets/images/usa.jpg';
import franceImage from '../assets/images/paris.jpg';
import egyptImage from '../assets/images/egypt.jpg';
import japanImage from '../assets/images/japan.jpg';
import SwitzerlandImage from '../assets/images/Switzerland.jpg';
import MarocImage from '../assets/images/maroc.jpg';

const CountryGrid = () => {
  const countries = [
    { name: 'USA', imageUrl: usaImage },
    { name: 'France', imageUrl: franceImage },
    { name: 'Egypt', imageUrl: egyptImage },
    { name: 'Japan', imageUrl: japanImage },
    { name: 'Switzerland', imageUrl: SwitzerlandImage },
    { name: 'Morocco', imageUrl: MarocImage },
  ];

  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <CountryCard key={index} country={country.name} imageUrl={country.imageUrl} />
      ))}
    </div>
  );
};

export default CountryGrid;
