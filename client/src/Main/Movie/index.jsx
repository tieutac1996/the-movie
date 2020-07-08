import { getAllMovie } from 'api/movie';
import MovieBox from 'components/MovieBox';
import MovieDetail from 'components/MovieDetail';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.scss';
import Filter from 'components/Filter';
function Movie() {
  const [data, setData] = useState();
  const [activeIndex, setActiveIndex] = useState(1);
  let page = [];
  useEffect(() => {
    async function fetchData() {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const a = await getAllMovie(params);
      setData(a);
    }
    fetchData();
  }, []);
  if (!data) {
    return <div></div>;
  }

  for (
    let i = 1;
    i <= Math.round(data.pagination._total / data.pagination._limit);
    i++
  ) {
    page.push(i);
  }

  async function handleClick(e) {
    setActiveIndex(e);
    const params = {
      _page: e,
      _limit: 10,
    };
    const a = await getAllMovie(params);
    setData(a);
  }
  function handleChange(e) {
    setData(e);
  }
  return (
    <div className='movie'>
      <Filter data={data} onChange={handleChange} />
      <Switch>
        <Route path='/movie/:title' component={MovieDetail} />
        <Route
          path='/movie/'
          exact
          component={() => <MovieBox data={data.data} />}
        />
      </Switch>
      <div className='pagination'>
        {page.map((map) => {
          const className = activeIndex === map ? 'active' : '';
          return (
            <li
              className={className}
              onClick={() => handleClick(map)}
              key={map}
            >
              {map}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default Movie;
