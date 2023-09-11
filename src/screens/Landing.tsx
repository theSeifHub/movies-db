import React, { useState } from 'react';
import '../styles/landing.css';
import Header from '../components/Header';
import ShowsBoard from '../components/ShowsBoard';
import RecentlyViewedSlider from '../components/RecentlyViewedSlider';
import { ShowType } from '../types';

function Landing() {
  const [currentTab, setCurrentTab] = useState<ShowType>(ShowType.Movie);
  const handleTabChange = (tabType: ShowType) => setCurrentTab(tabType);

  return (
    <>
      <Header currentTab={currentTab} />
      <RecentlyViewedSlider />
      <ShowsBoard currentTab={currentTab} onSwitchTabs={handleTabChange} />
    </>
  );
}

export default Landing;
