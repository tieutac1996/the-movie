import axios from 'axios';
import React, { useState } from 'react';
import './index.scss';
import MOVIE from 'components/Config/movie.input';
import XOADAU from 'components/Config/xoadau';

function MovieAdd(props) {
  const [data, setData] = useState({});
  const [file, setFile] = useState();
  const [tags, setTags] = useState({});
  const [uploaded, setUploaded] = useState();
  const [preview, setPreview] = useState({});

  const { hosting } = props;

  async function onUpload() {
    const formData = new FormData();

    const object = Object.entries(data);

    // Xử lý thể loại phim lưu vào mảng
    const tagsArray = Object.values(tags).filter((tag) => tag !== '');

    const filename = XOADAU(data.title.replace(/ /g, '-')).toLowerCase();

    object.map((map) => {
      formData.append(map[0], map[1]);
    });
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('image', file, filename);

    setUploaded('Đang upload...');

    await axios({
      url: `${hosting}/movie`,
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
  function handleCheckBox(e) {
    if (e.target.checked) {
      setTags({ ...tags, [e.target.name]: e.target.value });
    } else {
      setTags({ ...tags, [e.target.name]: '' });
    }
  }
  const urlPreviewImg = file ? (
    <img src={preview.imagePreviewUrl} alt='' />
  ) : (
    ''
  );
  if (hosting === null) {
    return <div>1</div>;
  }
  return (
    <div className='add__movie-fixed'>
      <div className='add__movie'>
        <div className='input'>
          {MOVIE.input.map((input, key) => {
            if (input.name === 'description') {
              return (
                <label key={key}>
                  {input.label}
                  <textarea
                    type={input.type}
                    name={input.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              );
            }
            return (
              <label key={key}>
                {input.label}
                <input
                  type={input.type}
                  name={input.name}
                  onChange={handleChange}
                  required
                />
              </label>
            );
          })}
        </div>
        <label style={{ margin: '25px 0' }}>
          Thể loại:
          <div className='checkbox'>
            {MOVIE.tags.map((tag, key) => (
              <div className='checkbox_items' key={key}>
                <span>{tag.name}</span>
                <input
                  type='checkbox'
                  name={tag.value}
                  value={tag.value}
                  onChange={handleCheckBox}
                />
              </div>
            ))}
          </div>
        </label>
        <label>
          Premium:
          <select name='premium' defaultValue='false' onChange={handleChange}>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </label>
        <div className='uploaded'>{uploaded}</div>
        <label>
          <input type='file' name='image' onChange={(e) => handleFile(e)} />
          <button onClick={onUpload}>Upload</button>
        </label>
        <div style={{ marginTop: '10px' }}>{urlPreviewImg}</div>
      </div>
    </div>
  );
}

export default MovieAdd;
