import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

BannerEdit.propTypes = {
  bannerDataID: PropTypes.object,
  onGetId: PropTypes.func,
};

BannerEdit.defaultProps = {
  bannerDataID: null,
  onGetId: null,
};

function BannerEdit(props) {
  const { bannerDataID, hosting, onGetId } = props;

  const params = useParams();

  useEffect(() => {
    onGetId(params);
  });
  const [data, setData] = useState(bannerDataID);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState({});

  const urlPreviewImg = file ? (
    <img src={preview.imagePreviewUrl} alt='' />
  ) : (
    ''
  );
  function handleChange() {}

  if (!data) {
    return <div></div>;
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleFile(e) {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  async function handleSave() {
    const formData = new FormData();
    const object = Object.entries(data);
    object.map((map) => formData.append(map[0], map[1]));
    formData.append('image', file);
    if (file) {
      formData.append('imgRemove', './client/public/' + bannerDataID.image);
    }

    await axios({
      url: `${hosting}/banner/${bannerDataID._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Update thành cống');
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className='banner__edit'>
      <div className='banner__edit-detail'>
        <div className='text'>
          <div className='title'>
            <b>Tên phim:</b>
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={handleChange}
            />
          </div>
          <div className='desc'>
            <b>Mô tả:</b>
            <textarea
              name='description'
              value={data.description}
              onChange={handleChange}
            />
          </div>
          <div className='evaluate'>
            <b>Đánh giá:</b>
            <input
              type='text'
              name='evaluate'
              value={data.evaluate}
              onChange={handleChange}
            />
          </div>
          <div className='duration'>
            <b>Thời lượng:</b>
            <input
              type='text'
              name='duration'
              value={data.duration}
              onChange={handleChange}
            />
          </div>
          <i style={{ display: 'block', color: 'red', margin: '20px 0' }}>
            Chọn để upload ảnh mới, để trống nếu không thay đổi ảnh
          </i>
          <input type='file' name='file' onChange={(e) => handleFile(e)} />
          <div>{urlPreviewImg}</div>
          <div className='button'>
            <button className='save' onClick={handleSave}>
              Lưu
            </button>
            <button className='canner'>Hủy</button>
          </div>
        </div>
        <div className='banner_image'>
          <img src={bannerDataID.image} alt='' />
        </div>
      </div>
    </div>
  );
}

export default BannerEdit;
