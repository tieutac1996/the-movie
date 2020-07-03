import { getMovieForType } from 'api/movie';
import MovieBoxSlide from 'components/MovieBoxSlide';
import React, { useEffect, useState } from 'react';

function Popular() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setData(await getMovieForType('popular'));
    }
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }
  return <MovieBoxSlide data={data} />;
}

export default Popular;
