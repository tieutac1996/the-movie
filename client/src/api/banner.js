import axios from 'axios';
import xoa_dau from 'Config/xoadau';

export async function createBannerUpload(data, image) {
  let response = {};

  const formData = new FormData();
  //Xử lý Object truyền vào FormData
  for (let prop in data) {
    formData.append(prop, data[prop]);
  }

  const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
  formData.append('image', image, filename);
  await axios({
    url: process.env.REACT_APP_API_URL + '/api/banner',
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
export async function deleteBannerForID(id, filename) {
  let response = {};
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/banner/${id}`,
    method: 'DELETE',

    data: { image: filename },
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
export async function getALlDataBanner() {
  let response = {};
  await axios({
    url: process.env.REACT_APP_API_URL + '/api/banner',
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
export async function editBannerForId(data, image) {
  const formData = new FormData();
  let response = {};
  for (let prop in data) {
    formData.append(prop, data[prop]);
  }

  if (image) {
    const filename = xoa_dau(data.title.replace(/ /g, '-')).toLowerCase();
    formData.append('image', image, filename);
  }
  await axios({
    url: `${process.env.REACT_APP_API_URL}/api/banner/${data._id}`,
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
