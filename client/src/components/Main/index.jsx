import React from 'react';
import { useSelector } from 'react-redux';
import Banner from './Banner/banner';

Main.propTypes = {};

function Main() {
  const hosting = useSelector((state) => state.hosting);
  return (
    <div>
      <Banner hosting={hosting.value} />
    </div>
  );
}

export default Main;
