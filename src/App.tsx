import React from 'react';
import './App.css';
import Header from './components/Header';
import ShowsBoard from './components/ShowsBoard';

function App() {
  return (
    <div className="app">
      <Header />
      <ShowsBoard />
    </div>
  );
}

export default App;
