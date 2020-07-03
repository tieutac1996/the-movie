import { getMovieForID } from 'api/movie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const a = await getMovieForID(params.id);
      setData(a);
    }
    fetchData();
  }, [params.id]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div>
      <h1 style={{ margin: '100px auto' }}>{data.title}</h1>
    </div>
  );
}

export default MovieDetail;
