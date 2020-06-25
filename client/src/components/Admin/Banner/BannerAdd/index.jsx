import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

BannerAdd.propTypes = {
  hosting: PropTypes.string,
};

BannerAdd.defaultProps = {
  hosting: null,
};

function BannerAdd(props) {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState({});

  async function onUpload() {
    const formData = new FormData();

    const object = Object.entries(data);

    object.map((map) => formData.append(map[0], map[1]));
    formData.append('image', file);

    await axios({
      url: '/banner',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('Thêm thành công.');
        }
      })
      .catch((err) => console.log(err));

    console.log('a');
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
  const urlPreviewImg = file ? (
    <img src={preview.imagePreviewUrl} alt='' />
  ) : (
    ''
  );
  return (
    <div>
      <div className='submit'>
        <label>
          Tên:
          <input type='text' name='title' onChange={handleChange} />
        </label>
        <label>
          Mô tả:
          <input type='text' name='description' onChange={handleChange} />
        </label>
        <label>
          Đánh giá:
          <input type='text' name='evaluate' onChange={handleChange} />
        </label>
        <label>
          Thời lượng:
          <input type='number' name='duration' onChange={handleChange} />
        </label>
        <label>
          <input type='file' name='image' onChange={(e) => handleFile(e)} />
          <button onClick={onUpload}>Upload</button>
        </label>
        <div>{urlPreviewImg}</div>
      </div>
    </div>
  );
}

export default BannerAdd;
