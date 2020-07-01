import React from 'react';
import Banner from './Banner/banner';
import { useState } from 'react';
import { useEffect } from 'react';
import { getALlDataBanner } from 'api/baner';
import Home from './Home';

function Main() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setBanner(await getALlDataBanner());
    }
    fetchData();
  }, []);
  return (
    <div>
      <Banner banner={banner} />
      <Home />
    </div>
  );
}

export default Main;
