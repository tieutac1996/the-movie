import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
BannerList.propTypes = {
  bannerData: PropTypes.array,
  hosting: PropTypes.string,
};

BannerList.defaultProps = {
  bannerData: null,
  hosting: null,
};

function BannerList(props) {
  const { bannerData, hosting } = props;
  if (!bannerData) {
    return <div></div>;
  }

  async function handleDelete(id) {
    await axios
      .delete(`${hosting}/banner/${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert('Đã xóa thành công.');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className='banner__list'>
        {bannerData.map((map, key) => (
          <div className='banner__list-items' key={key}>
            <div className='text'>
              <div className='title'>
                <b>Tên phim:</b>
                <div className='content'>{map.title}</div>
              </div>
              <div className='desc'>
                <b>Mô tả:</b>
                <div className='content'>{map.description}</div>
              </div>
              <div className='evaluate'>
                <b>Đánh giá:</b>
                <div className='content'>{map.evaluate}</div>
              </div>
              <div className='duration'>
                <b>Thời lượng:</b>
                <div className='content'>{map.duration}</div>
              </div>

              <div className='button'>
                <Link to={`/admin/banner/banner-edit/${map._id}`}>
                  <button className='edit'>Sửa</button>
                </Link>
                <button
                  className='delete'
                  onClick={() => handleDelete(map._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
            <div className='banner_image'>
              <img src={map.image} alt='' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerList;
