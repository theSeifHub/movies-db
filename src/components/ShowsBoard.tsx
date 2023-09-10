import React, { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { FiLoader } from "react-icons/fi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { searchMovies } from '../app/actionsAndThunks';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectMoviesList,
  selectSeriesList,
  selectStatus,
} from '../app/store';
import { IAbstractShow, ShowType, Status } from '../types';
import ShowBox from './ShowBox';

const ShowsBoard = (): JSX.Element => {
  const moviesList = useAppSelector(selectMoviesList);
  const seriesList = useAppSelector(selectSeriesList);
  const storeStatus = useAppSelector(selectStatus);

  const [currentTab, setCurrentTab] = useState<ShowType>(ShowType.Movie);
  const [showsList, setShowsList] = useState<IAbstractShow[]>(moviesList);


  useEffect(() => {
    if (currentTab === ShowType.Series) setShowsList(seriesList);
    else setShowsList(moviesList);
  }, [currentTab]);

  const handleTabClick = (e: SyntheticEvent, tabType: ShowType) => {
    e.preventDefault();
    if (tabType !== currentTab) {
      setCurrentTab(tabType);
    }
  }

  const showsTabs = () => {
    return (
      <div className="tabs-header">
				<button
          className={`tab-link ${currentTab === ShowType.Movie ? "active-tab" : ""}`}
          onClick={(e: SyntheticEvent) => handleTabClick(e, ShowType.Movie)}
        >
          Movies
        </button>
				<button
          className={`tab-link ${currentTab === ShowType.Series ? "active-tab" : ""}`}
          onClick={(e: SyntheticEvent) => handleTabClick(e, ShowType.Series)}
        >
          Series
        </button>
			</div>
    );
  };

  const renderPreview = (status: Status): ReactNode => {
    if (status === Status.Loading) {
      return (<FiLoader className='loader-icon' />);
    } else if (status === Status.Failed) {
      return (
        <div className='no-results'>
          <h3>No Shows Found</h3>
          <br />
          <MdSentimentDissatisfied fontSize='50' color='#ed0' />
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
      {showsTabs()}
      {renderPreview(storeStatus)}
    </div>
  )
}

export default ShowsBoard;