import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BannerAdd from './BannerAdd';
import BannerEdit from './BannerEdit';
import BannerList from './BannerList';
function Banner() {
  const match = useRouteMatch();
  const hosting = useSelector((state) => state.hosting.value);
  const [bannerData, setBannerData] = useState();
  const [bannerDataID, setBannerDataID] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${hosting}/banner`)
        .then((res) => {
          setBannerData(res.data);
        })
        .catch((err) => console.log(err));
    };
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
      <Switch>
        <Route
          path={`${match.url}/banner-edit/:id`}
          component={() => (
            <BannerEdit
              hosting={hosting}
              bannerDataID={bannerDataID}
              onGetId={onGetId}
            />
          )}
        />
        <Route
          path={`${match.url}/banner-add`}
          component={() => (
            <BannerAdd hosting={hosting} bannerData={bannerData} />
          )}
        />
        <Route
          path={`${match.url}/banner-list`}
          component={() => (
            <BannerList hosting={hosting} bannerData={bannerData} />
          )}
        />
      </Switch>
    </div>
  );
}

export default Banner;
