import { createBannerUpload } from 'api/banner';
import React, { useState } from 'react';
import './index.scss';

function BannerAdd(props) {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState();
  const [preview, setPreview] = useState({});

  async function onUpload() {
    if (!data || !file) {
      return alert('Nhập đầy đủ các mục');
    }
    setUploaded('Đang upload...');
    const a = await createBannerUpload(data, file);
    if (a.status === 200) {
      setUploaded('Tạo mới thành công');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setUploaded('Có lỗi khi tạo mới');
    }
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
          Tùy chọn:
          <input type='text' name='tags' onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type='text' name='url' onChange={handleChange} />
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
