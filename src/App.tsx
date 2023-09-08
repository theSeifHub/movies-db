import React from 'react';
import './App.css';
import Header from './components/Header';
import ShowsList from './components/ShowsList';

function App() {
  return (
    <div className="app">
      <Header />
      <ShowsList />
      <main className='board' />
    </div>
  );
}

export default App;
