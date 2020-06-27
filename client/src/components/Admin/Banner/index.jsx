import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import BannerAdd from './BannerAdd';
import BannerEdit from './BannerEdit';
import BannerList from './BannerList';
function Banner() {
  const match = useRouteMatch();
  const hosting = useSelector((state) => state.hosting.value);
  const [bannerData, setBannerData] = useState();
  const [bannerDataID, setBannerDataID] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        axios
          .get(`${hosting}/banner`)
          .then((res) => {
            setBannerData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [hosting]);

  function onGetId(e) {
    const data = bannerData.filter((filter) => filter._id === e.id);
    setBannerDataID(data[0]);
  }

  if (!bannerData) {
    return <div></div>;
  }

  return (
    <div>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          margin: '10px 0 0 10px',
        }}
      >
        <Link to='/admin/banner/add'>Thêm</Link>
      </button>
      <BannerList hosting={hosting} bannerData={bannerData} />
      <Switch>
        <Route
          path={`${match.url}/edit/:id`}
          component={() => (
            <BannerEdit
              hosting={hosting}
              bannerDataID={bannerDataID}
              onGetId={onGetId}
            />
          )}
        />
        <Route
          path={`${match.url}/add`}
          component={() => <BannerAdd hosting={hosting} />}
        />
      </Switch>
    </div>
  );
}

export default Banner;
