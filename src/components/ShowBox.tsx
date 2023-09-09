import React from 'react';
// import {} from "react-icons/fi";
import { useAppDispatch } from "../app/hooks";
// import { viewShow } from "../app/actionsAndThunks";

type Props = {
  showId: number | string;
  showTitle: string;
  showRating?: string;
  posterUrl: string;

}

const ShowBox = ({
  showId, showTitle, posterUrl, showRating,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  // const handleMoreInfoClick = () => {
  //   dispatch(viewShow({showId as string}));
  // };

  return (
    <li className='show-item'>
      <div className='show-container' style={{
        backgroundImage: `url(${posterUrl})`
      }}>
        <span className='rating'>{showRating}</span>
        <span className='show-title'>{showTitle}</span>
      </div>
    </li>
  )
}

export default ShowBox;