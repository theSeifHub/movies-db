import React, { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { FiLoader } from "react-icons/fi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { useAppSelector } from '../app/hooks';
import { 
  selectIsSearching,
  selectMoviesList,
  selectSeriesList,
  selectSearchStatus,
  selectSelectedShowId,
} from '../app/store';
import { IShow, ShowType, Status } from '../types';
import ShowBox from './ShowBox';

interface Props {
  currentTab: ShowType;
  onSwitchTabs: (newTab: ShowType) => void;
}

const ShowsBoard = ({currentTab, onSwitchTabs} : Props): JSX.Element => {
  const storeStatus = useAppSelector(selectSearchStatus);
  const isSearching = useAppSelector(selectIsSearching);
  const moviesList = useAppSelector(selectMoviesList);
  const seriesList = useAppSelector(selectSeriesList);
  const selectedShowId = useAppSelector(selectSelectedShowId);

  const [showsList, setShowsList] = useState<IShow[]>(moviesList);


  useEffect(() => {
    if (currentTab === ShowType.Series) setShowsList(seriesList);
    else setShowsList(moviesList);
  }, [currentTab, moviesList, seriesList]);

  const handleTabClick = (e: SyntheticEvent, tabType: ShowType) => {
    e.preventDefault();
    if (tabType !== currentTab) {
      onSwitchTabs(tabType);
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


  const renderPreview = (): ReactNode => {
    if (isSearching) {
      return (<FiLoader className='loader-icon' />);
    } else if (storeStatus === Status.Failed) {
      return (
        <div className='no-results'>
          <h3>No Shows Found</h3>
          <br />
          <MdSentimentDissatisfied fontSize='50' color='#ed0' />
        </div>
      );
    } else if (storeStatus === Status.Success) {
      return (
        <ul className='shows-board'>
          { showsList.map((show) => (
            <ShowBox
              key={show.imdbID}
              showInfo={show}
              isSelected={!!selectedShowId && selectedShowId === show.imdbID}
            />) )}
        </ul>
      );
    }
  };

  return (
    <div className='shows-board'>
      {showsTabs()}
      {renderPreview()}
    </div>
  )
}

export default ShowsBoard;