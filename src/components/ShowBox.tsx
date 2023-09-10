import React, { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getShow } from "../app/actionsAndThunks";
import { IShow } from '../types';
import ShowPreviewBox from './ShowPreviewBox';
import { selectSelectedShowId } from '../app/store';

type Props = {
  showInfo: IShow;
  isSelected: boolean;
}

const ShowBox = ({ showInfo, isSelected}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedShowId = useAppSelector(selectSelectedShowId);
  
  const handleBoxClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (showInfo.imdbID !== selectedShowId) {
      console.log("box clicked: ", showInfo.imdbID);
      dispatch(getShow({
        showId: showInfo.imdbID,
        showType: showInfo.Type,
      }));
    }
  };

  return (
    <>
      <li className={`show-item ${isSelected ? "yellow-border" : ""}`}>
        <div
          className='show-container'
          style={{backgroundImage: `url(${showInfo.Poster})`}}
          onClick={(e)  => handleBoxClick(e)}
        >
          <span className='show-year'>{showInfo.Year}</span>
          <span className='show-title'>{showInfo.Title}</span>
        </div>
      </li>
      {isSelected && <ShowPreviewBox />}
    </>
  )
}

export default ShowBox;