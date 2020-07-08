import xoa_dau from 'Config/xoadau';
import axios from 'axios';
import queryString from 'querystring';

export async function addMovie(data, image, tags, type, poster) {
  let response = {};

  const formData = new FormData();
  //Xử lý Object truyền vào FormData
  for (let prop in data) {
    formData.append(prop, data[prop]);
  }
  //Thêm image vào FormData và filename
  const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
  formData.append('image', image, filename);
  formData.append('poster', poster, filename + '-poster');

  //Xử lý tags rồi vào FormData
  formData.append('tags', JSON.stringify(tags));
  formData.append('type', JSON.stringify(type));
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie`,
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
export async function editMovie(data, image, tag, poster, type) {
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
  if (poster) {
    //Thêm image vào FormData và filename
    const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
    formData.append('poster', poster, filename + '-poster');
  }
  //Xử lý tags rồi vào FormData
  formData.append('newTags', JSON.stringify(tag));
  formData.append('newType', JSON.stringify(type));
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie`,
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
    url: `${process.env.REACT_APP_API_URL}/api/movie`,
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

export async function getAllMovie(params) {
  const p = queryString.stringify(params);
  let response = {};
  await axios({
    url:
      `${process.env.REACT_APP_API_URL}/api/movie?${p}` ||
      `${process.env.REACT_APP_API_URL}/api/movie`,
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
    url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
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
export async function getMovieForTitleTag(title) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie/title/${title}`,
    method: 'GET',
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data[0];
}

export async function getMovieTagsForID(id) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
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
    url: `${process.env.REACT_APP_API_URL}/api/movie/id/${id}`,
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
export async function getMovieForTag(query) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie/tags/?tags=${query}&_page=1&_limit=10`,
    method: 'GET',
  })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
export async function getMovieForType(query) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie/type/?type=${query}`,
    method: 'GET',
  })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
export async function deleteMovieForSelectID(select) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/movie/s`,
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
