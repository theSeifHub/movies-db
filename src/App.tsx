import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <main className='board' />
    </div>
  );
}

export default App;
