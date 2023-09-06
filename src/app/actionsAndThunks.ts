import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetMoviesResponse } from "../types";
import OMDbAxios from "./OMDbAxios";

// actions
export const viewPicture = createAction<number>('VIEW_PICTURE');

// thunks
export const getMoviesList = createAsyncThunk(
  'GET_MOVIES_ASYNC',
  async (): Promise<GetMoviesResponse> => {
    const response = await OMDbAxios.get('');
    console.log("getMoviesList ~ response:", response.data);
    return response.data.data;
  }
);
