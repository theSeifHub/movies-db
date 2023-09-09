import React, { ReactNode, useEffect } from 'react'
import { FiLoader } from "react-icons/fi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { searchMovies } from '../app/actionsAndThunks';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectMoviesList,
  selectIsSearching,
  selectStatus,
} from '../app/store';
import { Status } from '../types';
import ShowBox from './ShowBox';

const ShowsBoard = (): JSX.Element => {
  const storeStatus = useAppSelector(selectStatus);
  const showsList = useAppSelector(selectMoviesList);
  const isSearching = useAppSelector(selectIsSearching);

  // useEffect(() => {
  //   if (storeStatus === Status.Idle) {}
  // }, []);

  const renderPreview = (status: Status): ReactNode => {
    if (status === Status.Loading) {
      return (<FiLoader className='loader-icon' />);
    } else if (status === Status.Failed) {
      return (
        <div className='no-results'>
          <h3>
            No Shows Found
          </h3>
          <br />
          <MdSentimentDissatisfied
            fontSize='50'
            color='#ed0'
          />
        </div>
      );
    } else if (status === Status.Success) {
      return (
        <ul className='shows-board'>
          { showsList.map((show, i) => (
            <ShowBox
              key={show.imdbID}
              showId={show.imdbID}
              showTitle={show.Title}
              posterUrl={show.Poster}
              showRating={show.Rated}
            />
          ))}
        </ul>
      );
    }
  };

  return (
    <div className='shows-board'>
      <h2 className='board-title'>Movies</h2>
      {renderPreview(storeStatus)}
    </div>
  )
}

export default ShowsBoard;