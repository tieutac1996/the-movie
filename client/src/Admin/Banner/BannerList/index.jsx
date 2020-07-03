import { deleteBannerForID } from 'api/banner';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
BannerList.propTypes = {
  bannerData: PropTypes.array,
  onHandleEdit: PropTypes.func,
};

BannerList.defaultProps = {
  bannerData: null,
  onHandleEdit: null,
};

function BannerList(props) {
  const { bannerData } = props;
  if (!bannerData) {
    return <div></div>;
  }

  async function handleDelete(id, filename) {
    const a = await deleteBannerForID(id, filename);
    if (a.status === 200) {
      alert('Đã xóa thành công.');
      window.location.reload();
    } else {
      alert('Có lỗi xảy ra khi xóa');
    }
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
              <div className='evaluate'>
                <b>Thể loại:</b>
                <div className='content'>{map.tags}</div>
              </div>
              <div className='evaluate'>
                <b>Link:</b>
                <div className='content'>{map.url}</div>
              </div>
              <div className='duration'>
                <b>Thời lượng:</b>
                <div className='content'>{map.duration}</div>
              </div>

              <div className='button'>
                <Link to={`/admin/banner/edit/${map._id}`}>
                  <button className='edit'>Sửa</button>
                </Link>
                <button
                  className='delete'
                  onClick={() => handleDelete(map._id, map.image)}
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
