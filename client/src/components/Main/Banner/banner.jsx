import React from 'react';
import PropTypes from 'prop-types';

Banner.propTypes = {
  hosting: PropTypes.string,
};

Banner.defaultProps = {
  hosting: '',
};

function Banner(props) {
  const { hosting } = props;
  
  return <div></div>;
}

export default Banner;
