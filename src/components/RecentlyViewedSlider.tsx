import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectRecentlyViewed } from '../app/store';
import { getRecentlyViewed } from '../app/actionsAndThunks';


const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const RecentlyViewedSlider = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecentlyViewed());
  }, []);

  const recentlyViewedShows = useAppSelector(selectRecentlyViewed);

  return (
    <Slider {...settings} className='slider'>
      {recentlyViewedShows.map((show, i) =>
        <div key={i}>
          <div className='slider-item'>
            <img src={show.Poster} className='slider-img' alt={show.Title}></img>
            <span className='img-caption'>{show.Title}</span>
          </div>
        </div>
      )}
    </Slider>
  )
}

export default RecentlyViewedSlider;