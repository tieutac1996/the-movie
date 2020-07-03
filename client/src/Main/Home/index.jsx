import React, { useState, useEffect } from 'react';
import TabHeader from './TabHeader';
import TabMiddle from './TabMiddle';
import Film from './Film';
import TabFooter from './TabFooter';
import { getALlDataBanner } from 'api/banner';
import Banner from './Banner';

function Home() {
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
      <TabHeader />
      <TabMiddle />
      <Film />
      <TabFooter />
    </div>
  );
}

export default Home;
