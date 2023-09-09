import React from 'react';
import {
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { useAppDispatch } from "../app/hooks";
import {
  viewShow,
} from "../app/actionsAndThunks";

type Props = {
  showId: number | string;
  showTitle: string;
  showRating: string;
  showDescription: string;
  posterUrl: string;

}

const ShowBox = ({
  showId, showTitle, showDescription, posterUrl, showRating,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleEditClick = () => {
    dispatch(viewShow(showId as number));
  };

  const handleDeleteClick = () => {
    // dispatch(deleteTask(taskId))
  };

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