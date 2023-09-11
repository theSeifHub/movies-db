import React, { useEffect } from 'react';
import '../styles/details.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedShowInDetails, selectShowReviews } from '../app/store';
import { getShowReviews } from '../app/actionsAndThunks';
import ReviewBox from '../components/ReviewBox';

function ShowDetails() {
  const dispatch = useAppDispatch();
  const selectedShowInDetails = useAppSelector(selectSelectedShowInDetails);

  useEffect(() => {
    dispatch(getShowReviews(selectedShowInDetails?.Title as string));
  }, []);

  const showReviews = useAppSelector(selectShowReviews);


  return (
    <div className='show-details-container'>

      <div className='show-main-header'>
        <div className='details-poster'>
          <img src={selectedShowInDetails?.Poster} alt="poster" />
        </div>
        <div className='show-main-details'>
          <h1 className='details-title'>
            {selectedShowInDetails?.Title} ({selectedShowInDetails?.Year})
          </h1>
          <span className='type'>{selectedShowInDetails?.Type}</span>

          <div className='genre'>
            {selectedShowInDetails?.Genre.split(",").map((g: string, i: number) => <span className='genre-item' key={i}>{g}</span>)}
          </div>

          <div className='rating'>
            {selectedShowInDetails?.Ratings?.map((rating, i) => (
                <div key={i}>{rating.Source}: <span className='yellow'>{rating.Value}</span></div>
            ))}
          </div>
        </div>
      </div>


      <div className='plot'>
        <h3>Plot</h3>
        <p>{selectedShowInDetails?.Plot}</p>
      </div>

      <div className='directors-n-cast'>
        <div className='directors'>
          <h3>Directors</h3>
          <span>{selectedShowInDetails?.Director}</span>
        </div>
        <div className='cast'>
          <h3>Cast</h3>
          <span>{selectedShowInDetails?.Actors}</span>
        </div>
      </div>

      <hr />

      {!!showReviews.length && (
        <div className='show-reviews'>
          <h2>Reviews</h2>
          {showReviews.map((review, i) => (
            <ReviewBox key={i} review={review} />
          ))}
        </div>
      )}

    </div>
  );
}

export default ShowDetails;
