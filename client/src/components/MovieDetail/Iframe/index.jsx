import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
Iframe.propTypes = {
  data: PropTypes.object,
};

function Iframe(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  function handleCanner() {
    document.getElementsByClassName('iframe')[0].style.cssText =
      'z-index:-1;display:none';
    var iframe = document.getElementsByTagName('iframe')[0];

    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
  }
  return (
    <div className='iframe'>
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
      <div className='canner' onClick={handleCanner}>
        X
      </div>
    </div>
  );
}

export default Iframe;
