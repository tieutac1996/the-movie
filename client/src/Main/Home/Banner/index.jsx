import PropTypes from 'prop-types';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './index.scss';
import { Link } from 'react-router-dom';

Banner.propTypes = {
  banner: PropTypes.array,
};

Banner.defaultProps = {
  banner: [],
};

function Banner(props) {
  const { banner } = props;

  if (!banner) {
    return <div></div>;
  }

  return (
    <Carousel>
      {banner.map((map, key) => (
        <Carousel.Item key={key} className='banner_items'>
          <img className='d-block w-100' src={map.image} alt='' />
          <Carousel.Caption className='banner_caption'>
            <div className='banner_caption_content'>
              <div className='banner_duration'>
                <span>Thời lượng: </span>
                {map.duration}
                <span> phút</span>
              </div>
              <div className='banner_title'>{map.title}</div>
              <div className='banner_evaluate'>
                <span>
                  <i className='fas fa-star'></i>
                </span>
                {map.evaluate}
                <span className='tags'>{map.tags}</span>
              </div>
              <div className='banner_description'>{map.description}</div>
              <div className='watch'>
                <i className='fas fa-play'></i>
                <Link to={`/movie/${map.url}`}>
                  <span>Xem ngay</span>
                </Link>
              </div>
              <div className='add-list'>
                <i className='fas fa-plus'></i>
                <span>Xem sau</span>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Banner;
