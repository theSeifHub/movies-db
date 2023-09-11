import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useAppDispatch } from '../app/hooks';
import { searchMovies, searchSeries } from '../app/actionsAndThunks';
import { INYTimesReview, ShowType } from '../types';

interface Props {
  review: INYTimesReview;
}

const ReviewBox = ({ review }: Props) => {
  return (
    <div className='review-box'>
      <h4 className='review-header'>{review.headline.main}</h4>
      <h5 className='pub-date'>on {review.pub_date}</h5>
      <p>{review.abstract}&nbsp;
        <a href={review.web_url} className='read-more-link' target='_blank' rel="noreferrer">Read more...</a>
      </p>
      
    </div>
  )
}

export default ReviewBox;