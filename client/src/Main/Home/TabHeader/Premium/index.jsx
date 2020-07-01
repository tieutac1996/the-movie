import React from 'react';
import PropTypes from 'prop-types';
import MovieBox from 'components/MovieBox';

Premium.propTypes = {
  data: PropTypes.array,
};

Premium.defaultProps = {
  data: null,
};

function Premium(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  console.log(data);
  return <MovieBox data={data} />;
}

export default Premium;
