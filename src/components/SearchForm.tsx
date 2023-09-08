import React, { useState } from 'react';
import { FiSearch, FiX } from "react-icons/fi";
import { useAppDispatch } from '../app/hooks';
// import {
//   getMoviesList, searchMovies,
// } from '../app/actionsAndThunks';


const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    if (query) {
      console.log("🚀 ~ handleSearch ~ query", query);
      // dispatch(searchMovies(query));
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('');
    console.log("🚀 ~ handleClearSearch");
    // dispatch(getMoviesList());
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
         
        <button
          title='Search'
          aria-label='Clear Search'
          disabled={!searchQuery}
          className='clear-btn'
          onClick={(e) => {
            e.preventDefault();
            handleClearSearch();
          }}
        >
          <FiX className='btn-icon' />
        </button>
      </div>
    </form>
  )
}

export default SearchForm;