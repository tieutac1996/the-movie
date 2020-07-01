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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className='movieBox'>
      <Slider {...settings}>
        {data.map((data, key) => (
          <Col key={key}>
            <Card>
              <Card.Img
                className='movieBox-img'
                variant='top'
                src={data.image}
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
