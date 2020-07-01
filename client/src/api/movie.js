import xoa_dau from 'Config/xoadau';
import axios from 'axios';

export async function addMovie(data, image, tags, type) {
  let response = {};

  const formData = new FormData();
  //Xử lý Object truyền vào FormData
  for (let prop in data) {
    formData.append(prop, data[prop]);
  }
  //Thêm image vào FormData và filename
  const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
  formData.append('image', image, filename);
  //Xử lý tags rồi vào FormData
  formData.append('tags', JSON.stringify(tags));
  formData.append('type', JSON.stringify(type));

  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
export async function editMovie(data, image, tag) {
  let response = {};

  const formData = new FormData();
  //Xử lý Object truyền vào FormData
  for (let prop in data) {
    formData.append(prop, data[prop]);
  }

  if (image) {
    //Thêm image vào FormData và filename
    const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
    formData.append('image', image, filename);
  }
  //Xử lý tags rồi vào FormData
  formData.append('newTags', JSON.stringify(tag));

  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE,
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}

export async function deleteMovie(id, filename) {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE,
    method: 'DELETE',
    data: { id: id, filename: filename },
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
}

export async function getAllMovie() {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE,
    method: 'GET',
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data;
}

export async function getMovieForID(id) {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE + `/${id}`,
    method: 'GET',
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data;
}

export async function getMovieTagsForID(id) {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE + `/${id}`,
    method: 'GET',
  })
    .then((res) => {
      response = res.data.tags;
    })
    .catch((err) => {
      console.log(err);
    });
  return JSON.parse(response);
}
export async function getMovieTypeForID(id) {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE + `/${id}`,
    method: 'GET',
  })
    .then((res) => {
      response = res.data.type;
    })
    .catch((err) => {
      console.log(err);
    });
  return JSON.parse(response);
}
export async function deleteMovieForSelectID(select) {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL_MOVIE + `/s`,
    method: 'POST',
    data: select,
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
