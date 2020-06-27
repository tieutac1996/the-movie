import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
MovieList.propTypes = {
  movieData: PropTypes.array,
  hosting: PropTypes.string,
  onHandleEdit: PropTypes.func,
};

MovieList.defaultProps = {
  movieData: null,
  hosting: null,
  onHandleEdit: null,
};

function MovieList(props) {
  const { movieData, hosting } = props;
  if (!movieData) {
    return <div></div>;
  }
  async function handleDelete(id, image) {
    await axios({
      url: `${hosting}/movie/${id}`,
      method: 'DELETE',
      data: { image: image },
    })
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
      <div className='movie__list'>
        {movieData.map((map, key) => (
          <div className='movie__list-items' key={key}>
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
                <Link to={`/admin/movie/edit/${map._id}`}>
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
            <div className='movie_image'>
              <img src={map.image} alt='' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
