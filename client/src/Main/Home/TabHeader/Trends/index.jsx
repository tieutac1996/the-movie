import { getMovieForType } from 'api/movie';
import MovieBox from 'components/MovieBox';
import React, { useEffect, useState } from 'react';

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
  return <MovieBox data={data} />;
}

export default Trends;
