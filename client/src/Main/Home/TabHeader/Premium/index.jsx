import MovieBox from 'components/MovieBox';
import React, { useState, useEffect } from 'react';
import { getMovieForType } from 'api/movie';

function Premium() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setData(await getMovieForType('premium'));
    }
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }
  return <MovieBox data={data} />;
}

export default Premium;
