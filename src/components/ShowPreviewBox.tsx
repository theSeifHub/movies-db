import React from 'react';
import { PiStarFill, PiStarHalfFill, PiStar } from "react-icons/pi";
import { useAppSelector } from "../app/hooks";
import { selectGetOneStatus, selectSelectedShowInDetails } from '../app/store';
import { Status } from '../types';
import { FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RatingStars = (ratingString: string): JSX.Element => {
  let keyCounter = 0;
  // imdb rating is out of 10; here divided by 2 to make it out of 5;
  const ratingNumber = isNaN(Number(ratingString)) ? 0 : Number(ratingString) / 2;
  const stars = Array(Math.floor(ratingNumber)).fill("fill-star").map((star: string, i: number) => (
    <PiStarFill key={keyCounter++} className='rating-star'/>
  ));

  if ((ratingNumber % 1) > 0.4) {
    stars.push(<PiStarHalfFill key={keyCounter++} className='rating-star'/>);
  }
  
  if (stars.length < 5) {
    const emptyStars = Array(5 - stars.length).fill("star").map((star: string, i: number) => (
      <PiStar key={keyCounter++} className='rating-star'/>
    ));
    stars.push(...emptyStars);
  }

  return (<>{stars}</>);
}


const ShowPreviewBox = (): JSX.Element | null => {
  const navigate = useNavigate();
  const selectedShowInDetails = useAppSelector(selectSelectedShowInDetails);
  const getOneStatus = useAppSelector(selectGetOneStatus);
  
  const handleMoreInfoClick = () => {
    navigate(`/${selectedShowInDetails?.imdbID}`);
  };

  if (getOneStatus === Status.Loading) {
    return <div className='show-preview-container' style={{ textAlign: 'center'}}><FiLoader className='loader-icon' /></div>
  }

  if (!selectedShowInDetails) return null;

  return (
    <div className='show-preview-container' style={{ 
      background: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${selectedShowInDetails.Poster})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <div className='show-preview-details'>

        <h3 className='show-preview-title'>{selectedShowInDetails.Title}</h3>
        <p className='show-preview-plot'>{selectedShowInDetails.Plot}</p>

        <div className='show-details-lists'>
          <div className='preview-list-container'>
            <span className='list-title'>Rating</span>
            <div>{RatingStars(selectedShowInDetails.imdbRating)}</div>
          </div>

          <div className='preview-list-container'>
            <span className='list-title'>Genre</span>
            <div className='genre-list'>
              {selectedShowInDetails.Genre.split(",").map((g: string, i: number) => <span className='genre-item' key={i}>{g}</span>)}
            </div>
          </div>

          <div className='preview-list-container'>
            <span className='list-title'>Released</span>
            <span>{selectedShowInDetails.Released}</span>
          </div>

          <div className='preview-list-container'>
            <span className='list-title'>Directors</span>
            <div className='directors-list'>
              {selectedShowInDetails.Director.split(",").map((d: string, i: number) => <span key={i}>{d}</span>)}
            </div>
          </div>

          <div className='preview-list-container'>
            <span className='list-title'>Languages</span>
            <div className='languages-list'>
              {selectedShowInDetails.Language.split(",").map((l: string, i: number) => <span className='language-item' key={i}>{l}</span>)}
            </div>
          </div>
        </div>
        <div>
          <button className='more-info-btn' onClick={handleMoreInfoClick}>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowPreviewBox;