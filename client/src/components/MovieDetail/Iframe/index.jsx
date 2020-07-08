import React from 'react';
import PropTypes from 'prop-types';

Iframe.propTypes = {
  data: PropTypes.object,
};

function Iframe(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return (
    <iframe
      className='iframe-embed'
      width='100%'
      height='600'
      src={data.url}
      title={data.title}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  );
}

export default Iframe;
