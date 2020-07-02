import MovieBox from 'components/MovieBox';
import MOVIE from 'Config/movie.input';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { getMovieForTag } from 'api/movie';
import './index.scss';
function TabMiddle() {
  const [data, setData] = useState({});
  const rows = 2;
  useEffect(() => {
    async function fetchData() {
      const sci_fi = await getMovieForTag('sci-fi');
      const action = await getMovieForTag('action');
      const adventure = await getMovieForTag('adventure');
      const horror = await getMovieForTag('horror');
      const sport = await getMovieForTag('sport');
      const comedy = await getMovieForTag('comedy');
      const war = await getMovieForTag('war');
      const anime = await getMovieForTag('anime');
      setData({
        sci: sci_fi,
        action,
        adventure,
        horror,
        sport,
        comedy,
        war,
        anime,
      });
    }
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }
  return (
    <Tabs defaultActiveKey='sci-fi' className='tabMiddle'>
      {MOVIE.tags.map((tab, key) => (
        <Tab key={key} eventKey={tab.value} title={tab.name}>
          {tab.value === 'sci-fi' && <MovieBox data={data.sci} row={rows} />}
          {tab.value === 'comedy' && <MovieBox data={data.comedy} row={rows} />}
          {tab.value === 'action' && <MovieBox data={data.action} row={rows} />}
          {tab.value === 'adventure' && (
            <MovieBox data={data.adventure} row={rows} />
          )}
          {tab.value === 'horror' && <MovieBox data={data.horror} row={rows} />}
          {tab.value === 'war' && <MovieBox data={data.war} row={rows} />}
          {tab.value === 'anime' && <MovieBox data={data.anime} row={rows} />}
          {tab.value === 'sport' && <MovieBox data={data.sport} row={rows} />}
        </Tab>
      ))}
    </Tabs>
  );
}

export default TabMiddle;
