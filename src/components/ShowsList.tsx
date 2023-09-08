import React, { useEffect } from 'react'
import { FiLoader } from "react-icons/fi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { getMoviesList } from '../app/actionsAndThunks';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectMoviesList,
  selectIsSearching,
  selectStatus,
} from '../app/store';
import { Status } from '../types';
import ShowBox from './ShowBox';

const MoviesList = (): JSX.Element => {
  const storeStatus = useAppSelector(selectStatus);
  const showsList = useAppSelector(selectMoviesList);
  const isSearching = useAppSelector(selectIsSearching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeStatus === Status.Idle) {
      dispatch(getMoviesList());
    }
  }, []);

  return (
    <div className='tasks-list'>
      <h2>Shows List</h2>
      {/* { storeStatus === Status.Loading
        ? <FiLoader className='loader-icon' /> : (
          isSearching && !showsList.length ? (
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
          ) : ( */}
            <ul className='shows-list'>
              { Array(5).fill("show").map(show => (
                <ShowBox
                  key={5}
                  showId={5}
                  showTitle={"One Flew Over the Cuckoo's Nest"}
                  showDescription={"One Flew Over the Cuckoo's Nest"}
                  posterUrl={"https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"}
                  showRating={"PG-13"}
                />
              ))}
            </ul>
          {/* )
        )
      } */}
    </div>
  )
}

export default MoviesList;