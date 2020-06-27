import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import MovieList from './MovieList';
import MovieAdd from './MovieAdd';
import MovieEdit from './MovieEdit';
function Movie() {
  const match = useRouteMatch();
  const hosting = useSelector((state) => state.hosting.value);
  const [movieData, setMovieData] = useState();
  const [movieDataID, setMovieDataID] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        axios
          .get(`${hosting}/movie`)
          .then((res) => {
            setMovieData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [hosting]);

  function onGetId(e) {
    const data = movieData.filter((filter) => filter._id === e.id);
    setMovieDataID(data[0]);
  }

  if (!movieData) {
    return <div></div>;
  }
  console.log(match.url);
  return (
    <div>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          margin: '10px 0 0 10px',
        }}
      >
        <Link to='/admin/movie/add'>Thêm</Link>
      </button>
      <MovieList hosting={hosting} movieData={movieData} />
      <Switch>
        <Route
          path='/admin/movie/edit/:id'
          component={() => (
            <MovieEdit
              hosting={hosting}
              movieDataID={movieDataID}
              onGetId={onGetId}
            />
          )}
        />
        <Route
          path='/admin/movie/add'
          component={() => <MovieAdd hosting={hosting} />}
        />
      </Switch>
    </div>
  );
}

export default Movie;
