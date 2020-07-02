import MOVIE from 'Config/movie.input';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './index.scss';
import Popular from './Popular';
import Premium from './Premium';
import Trends from './Trends';

function TabHeader() {
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
          {tab.value === 'trends' && <Trends />}
          {tab.value === 'popular' && <Popular />}
          {tab.value === 'premium' && <Premium />}
        </Tab>
      ))}
    </Tabs>
  );
}

export default TabHeader;
