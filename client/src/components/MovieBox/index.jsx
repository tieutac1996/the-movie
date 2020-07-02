import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import './index.scss';
MovieBox.propTypes = {
  data: PropTypes.array,
};

MovieBox.defaultProps = {
  data: null,
};
function MovieBox(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }

  const row = data.length > 6;

  var settings = {
    slidesToShow: 5,
    rows: row ? row : 1,
    dots: false,
    infinite: false,
    speed: 500,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className='movieBox'>
      <Slider {...settings}>
        {data.map((data, key) => (
          <Col key={key} className='movieBox-items'>
            <Card>
              <Card.Img
                className='movieBox-img'
                variant='top'
                src={data.poster}
              />
              <Card.Body>
                <Card.Text className='movieBox-title'>{data.title}</Card.Text>
                <Card.Text className='movieBox-evaluate'>
                  {data.release_date.slice(data.release_date.length - 4)}
                  <span>
                    <i className='fas fa-star'></i>
                    {data.evaluate}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Slider>
    </div>
  );
}

export default MovieBox;
