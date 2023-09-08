import {
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getMoviesList,
} from "./actionsAndThunks";
import { MoviesDBState, Status } from "../types";

const initialState: MoviesDBState = {
  recentlyViewed: [],
  moviesList: [],
  seriesList: [],
  showToView: null,
  isSearching: false,
  status: Status.Idle,
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getMoviesList.pending, (state) => {
      state.status = Status.Loading;
      state.isSearching = false;
    }).addDefaultCase(state => state);
})

export default moviesReducer;
