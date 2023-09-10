import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ShowsBoard from './components/ShowsBoard';
import { ShowType } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState<ShowType>(ShowType.Movie);
  const handleTabChange = (tabType: ShowType) => setCurrentTab(tabType);

  return (
    <div className="app">
      <Header currentTab={currentTab} />
      <ShowsBoard currentTab={currentTab} onSwitchTabs={handleTabChange} />
    </div>
  );
}

export default App;
