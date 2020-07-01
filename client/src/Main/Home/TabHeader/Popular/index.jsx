import React from 'react';
import PropTypes from 'prop-types';
import MovieBox from 'components/MovieBox';

Popular.propTypes = {
  data: PropTypes.array,
};

Popular.defaultProps = {
  data: null,
};

function Popular(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return <MovieBox data={data} />;
}

export default Popular;
