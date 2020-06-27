import axios from 'axios';
import React, { useState } from 'react';
import './index.scss';

function BannerAdd(props) {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState();
  const [preview, setPreview] = useState({});

  const { hosting } = props;

  async function onUpload() {
    const formData = new FormData();

    const object = Object.entries(data);

    object.map((map) => {
      formData.append(map[0], map[1]);
    });
    formData.append('image', file);

    setUploaded('Đang upload...');

    await axios({
      url: `http://localhost:8080/banner`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          setUploaded('Upload Thành công');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (res.status === 500) {
          setUploaded('Có lỗi khi upload!');
        }
      })
      .catch((err) => console.log(err));
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

  if (hosting === null) {
    return <div></div>;
  }

  return (
    <div className='add__banner-fixed'>
      <div className='add__banner'>
        <label>
          Tên:
          <input type='text' name='title' onChange={handleChange} />
        </label>
        <label>
          Mô tả:
          <textarea type='text' name='description' onChange={handleChange} />
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
        <div className='uploaded'>{uploaded}</div>
        <div>{urlPreviewImg}</div>
      </div>
    </div>
  );
}

export default BannerAdd;
