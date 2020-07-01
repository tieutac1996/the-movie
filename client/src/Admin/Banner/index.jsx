import { getALlDataBanner } from 'api/baner';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import BannerAdd from './BannerAdd';
import BannerEdit from './BannerEdit';
import BannerList from './BannerList';
function Banner() {
  const match = useRouteMatch();
  const [bannerData, setBannerData] = useState();
  const [bannerDataID, setBannerDataID] = useState();
  useEffect(() => {
    async function fetchData() {
      setBannerData(await getALlDataBanner());
    }
    fetchData();
  }, []);

  function onGetId(e) {
    const data = bannerData.filter((filter) => filter._id === e.id);
    setBannerDataID(data[0]);
  }

  if (!bannerData) {
    return <div></div>;
  }

  return (
    <div>
      <Link to='/admin/banner/add'>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            margin: '10px 0 0 10px',
          }}
        >
          Thêm
        </button>
      </Link>

      <BannerList bannerData={bannerData} />
      <Switch>
        <Route
          path={`${match.url}/edit/:id`}
          component={() => (
            <BannerEdit bannerDataID={bannerDataID} onGetId={onGetId} />
          )}
        />
        <Route path={`${match.url}/add`} component={BannerAdd} />
      </Switch>
    </div>
  );
}

export default Banner;
