import React from 'react';
import SearchForm from './SearchForm';

const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <h1 className='title'>
        <span className='movies'>Movies</span><span className='db'>DB</span>
      </h1>
      <SearchForm />
    </header>
  )
}

export default Header;