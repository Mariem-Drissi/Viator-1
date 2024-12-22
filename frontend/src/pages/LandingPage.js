import React from 'react';
import Banner from '../components/Banner';
import CountryGrid from '../components/CountryGrid';

function LandingPage() {
  return (
    <div>
      <Banner />
      <div>
    <h1>Famous Countries</h1>
    <CountryGrid />
  </div>

    </div>
  );
}

export default LandingPage;
