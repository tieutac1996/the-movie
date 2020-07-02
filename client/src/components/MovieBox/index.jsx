import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import './index.scss';
MovieBox.propTypes = {
  data: PropTypes.array,
  row: PropTypes.number,
};

MovieBox.defaultProps = {
  data: null,
  row: null,
};
function MovieBox(props) {
  const { data, row } = props;
  if (!data) {
    return <div></div>;
  }
  var settings = {
    slidesToShow: 5,
    rows: row ? row : 1,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerPadding: '10px',
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
