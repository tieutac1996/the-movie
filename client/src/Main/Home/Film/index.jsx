import React, { useState } from 'react';
import { useEffect } from 'react';
import { getALlDataBanner } from 'api/banner';
import './index.scss';
import { Link } from 'react-router-dom';
function Film() {
  const [data, setData] = useState();
  const [height, setHeight] = useState({ height: '600px' });
  useEffect(() => {
    async function fetchData() {
      const a = await getALlDataBanner();
      setData(a[a.length - 1]);
    }
    fetchData();
  }, []);
  const backgroundImage = data
    ? {
        backgroundImage: `url(${data.image})`,
        backgroundPosition: 'top center',
      }
    : '';
  if (!data) {
    return <div></div>;
  }
  function handlePlay() {
    document.getElementsByClassName('film-banner')[0].style.display = 'none';
    setHeight({ height: 'auto' });
  }
  return (
    <div className='film' style={height}>
      <div className='film-banner' style={backgroundImage}>
        <div className='film-transparent'>
          <div className='film-evaluate'>
            <span>
              <i className='fas fa-star'></i>
            </span>
            {data.evaluate}
            <span className='tags'>{data.tags}</span>
          </div>
          <div className='film-duration'>
            <span>Thời lượng: </span>
            {data.duration} phút
          </div>
          <div className='film-name'>{data.title}</div>
          <div className='film-description'>{data.description}</div>
          <div className='watch' onClick={handlePlay}>
            <i className='fas fa-play'></i>
            <Link to={`/movie/${data.url}`}>
              <span>Xem ngay</span>
            </Link>
          </div>
          <div className='add-list'>
            <i className='fas fa-plus'></i>
            <span>Xem sau</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Film;
