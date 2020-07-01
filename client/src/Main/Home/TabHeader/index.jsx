import { getAllMovie } from 'api/movie';
import MOVIE from 'Config/movie.input';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './index.scss';
import Popular from './Popular';
import Trends from './Trends';

function TabHeader() {
  const [data, setData] = useState();
  let trends = [];
  let popular = [];
  let premium = [];
  useEffect(() => {
    async function fetchData() {
      setData(await getAllMovie());
    }
    fetchData();
  }, []);
  if (!data) {
    return <div></div>;
  }

  function filterMovie() {
    data.map((data) => {
      if (data.type) {
        const type = JSON.parse(data.type);
        if (type.some((some) => some === 'trends')) {
          trends = [...trends, data];
        }
        if (type.some((some) => some === 'popular')) {
          popular = [...popular, data];
        }
        if (type.some((some) => some === 'premium')) {
          premium = [...premium, data];
        }
      }
    });
  }
  filterMovie();

  return (
    <Tabs defaultActiveKey='trends' className='tabHeader'>
      {MOVIE.tabHeader.map((tab, key) => (
        <Tab
          key={key}
          eventKey={tab.value}
          title={
            <div>
              <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
              {tab.name}
            </div>
          }
        >
          {tab.value === 'trends' && <Trends data={trends} />}
          {tab.value === 'popular' && <Popular data={popular} />}
          {tab.value === 'premium' && <Popular data={premium} />}
        </Tab>
      ))}
    </Tabs>
  );
}

export default TabHeader;
