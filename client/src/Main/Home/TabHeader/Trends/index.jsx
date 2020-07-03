import { getMovieForType } from 'api/movie';
import React, { useEffect, useState } from 'react';
import MovieBoxSlide from 'components/MovieBoxSlide';

function Trends() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setData(await getMovieForType('trends'));
    }
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }
  return <MovieBoxSlide data={data} />;
}

export default Trends;
