import React from 'react';
import SearchForm from './SearchForm';
import { ShowType } from '../types';

interface Props {
  currentTab: ShowType;
}

const Header = ({ currentTab }: Props): JSX.Element => {
  return (
    <header className='header'>
      <h1 className='title'>
        <span className='movies'>Movies</span><span className='db'>DB</span>
      </h1>
      <SearchForm currentTab={currentTab} />
    </header>
  )
}

export default Header;