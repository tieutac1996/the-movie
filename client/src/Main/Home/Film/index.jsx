import React, { useState } from 'react';
import { useEffect } from 'react';
import { getALlDataBanner } from 'api/banner';
import './index.scss';
function Film() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const a = await getALlDataBanner();
      setData(a[a.length - 1]);
    }
    fetchData();
  }, []);
  if (!data) {
    return <div></div>;
  }
  function handlePlay() {
    document.getElementById('video').play();
    document.getElementsByClassName('film-image')[0].style.display = 'none';
    document.getElementsByClassName('film-banner')[0].style.display = 'none';
    document.getElementsByClassName('film-transparent')[0].style.display =
      'none';
  }
  return (
    <div className='film'>
      <video controls src={data.url} id='video'></video>
      <div className='film-banner'>
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
          <span>Xem ngay</span>
        </div>
        <div className='add-list'>
          <i className='fas fa-plus'></i>
          <span>Xem sau</span>
        </div>
      </div>
      <div className='film-image'>
        <img src={data.image} alt='' />
      </div>
      <div className='film-transparent'></div>
    </div>
  );
}

export default Film;
