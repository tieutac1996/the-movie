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
  const [updating, setUpdating] = useState();

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
  async function handleUpdate() {
    setUpdating('Đang cập nhật...');
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
          setUpdating('Cập nhật thành công');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className='banner__edit'>
      <div className='banner__edit-detail'>
        <div className='text'>
          <label>
            <b>Tên:</b>
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={handleChange}
            />
          </label>
          <label>
            <b>Mô tả:</b>
            <textarea
              type='text'
              name='description'
              value={data.description}
              onChange={handleChange}
            />
          </label>
          <label>
            <b>Đánh giá:</b>
            <input
              type='text'
              name='evaluate'
              value={data.evaluate}
              onChange={handleChange}
            />
          </label>
          <label>
            <b>Thời lượng:</b>
            <input
              type='number'
              name='duration'
              value={data.duration}
              onChange={handleChange}
            />
          </label>
          <label>
            <input type='file' name='image' onChange={(e) => handleFile(e)} />
            <div className='updating'>{updating}</div>
            <button className='update' onClick={handleUpdate}>
              Cập nhật
            </button>
            <button className='canner'>Hủy</button>
          </label>
        </div>
        <img src={bannerDataID.image} alt='' />
        <div>{urlPreviewImg}</div>
      </div>
    </div>
  );
}

export default BannerEdit;
