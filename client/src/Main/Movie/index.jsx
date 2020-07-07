import { getAllMovie } from 'api/movie';
import MovieBox from 'components/MovieBox';
import MovieDetail from 'components/MovieDetail';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.scss';
function Movie() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const a = await getAllMovie();
      setData(a);
    }
    fetchData();
  }, []);

  return (
    <div className='movie'>
      <Switch>
        <Route path='/movie/:title' component={MovieDetail} />
        <Route
          path='/movie/'
          exact
          component={() => <MovieBox data={data} />}
        />
        {/* <Route>
          <MovieBox data={data} />
        </Route> */}
      </Switch>
    </div>
  );
}

export default Movie;
