import { getMovieForTitleTag } from 'api/movie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Original from './Original';
import Tab from './Tab';
import Iframe from './Iframe';
import './index.scss';

function MovieDetail() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const a = await getMovieForTitleTag(params.title);
      setData(a);
    }
    fetchData();
  }, [params.title]);

  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className='detail-movie'>
        <Iframe data={data} />
        <Original data={data} />
        <Tab data={data} />
      </div>
    </div>
  );
}

export default MovieDetail;
