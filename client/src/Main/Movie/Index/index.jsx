import React from 'react';
import PropTypes from 'prop-types';

Index.propTypes = {
  data: PropTypes.array,
};

function Index(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return <div></div>;
}

export default Index;
