import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
Original.propTypes = {
  data: PropTypes.object,
};

Original.defaultProps = {
  data: null,
};

function Original(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return (
    <div className='top'>
      <div className='content'>
        <div className='title'>{data.title}</div>
        <div className='duration'>Thời lượng: {data.duration} phút</div>
        <div className='description'>{data.description}</div>
        <div className='button'>
          <div className='watch'>
            <i className='fas fa-play'></i>
            <span>Xem ngay</span>
          </div>
          <div className='add-list'>
            <i className='fas fa-plus'></i>
            <span>Xem sau</span>
          </div>
        </div>
        <i className='fas fa-thumbs-up icon'></i>
        <i className='fas fa-thumbs-down icon'></i>
      </div>
      <div className='image'>
        <img src={data.image} alt='' />
        <div className='after'></div>
      </div>
    </div>
  );
}

export default Original;
