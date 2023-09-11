import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
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
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const RecentlyViewedSlider = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecentlyViewed());
  }, []);

  const recentlyViewedShows = useAppSelector(selectRecentlyViewed);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <button className="recently-viewed-collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        Recently Viewed {isCollapsed
          ? <FiChevronUp style={{ fontSize: "xx-large", transform: "translateY(30%)" }} />
          : <FiChevronDown style={{ fontSize: "xx-large", transform: "translateY(30%)" }} />
        }
      </button>

      <div style={{ display: isCollapsed ? "none" : "block"}}>
        <Slider {...settings} className='slider'>
          {recentlyViewedShows.map((show, i) =>
            <div key={i}>
              <div className='slider-item'>
                <img src={show.Poster} className='slider-img' alt={show.Title}></img>
              </div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  )
}

export default RecentlyViewedSlider;