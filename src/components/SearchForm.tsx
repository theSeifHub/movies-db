import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useAppDispatch } from '../app/hooks';
import { searchMovies, searchSeries } from '../app/actionsAndThunks';
import { ShowType } from '../types';

interface Props {
  currentTab: ShowType;
}

const SearchForm = ({ currentTab }: Props) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    if (query) {
      if (currentTab === ShowType.Movie) dispatch(searchMovies(query));
      else dispatch(searchSeries(query));
    }
  }

  return (
    <form className='search-form'>
      <label htmlFor="search-input" />
      <div className='search-box'>
        <FiSearch className='btn-icon'/>
        <input
          type="text"
          name="search-input"
          placeholder='Search'
          className="search-input"
          aria-label='Search Input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          title='Search'
          aria-label='Search'
          disabled={!searchQuery}
          className='search-btn'
          hidden
          onClick={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
          }}
        />
      </div>
    </form>
  )
}

export default SearchForm;