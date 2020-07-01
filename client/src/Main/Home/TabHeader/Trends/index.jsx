import React from 'react';
import PropTypes from 'prop-types';
import MovieBox from 'components/MovieBox';

Trends.propTypes = {
  data: PropTypes.array,
};

Trends.defaultProps = {
  data: null,
};

function Trends(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return <MovieBox data={data} />;
}

export default Trends;
