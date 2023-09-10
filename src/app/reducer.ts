import {
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  viewShow, searchMovies, searchSeries, getMovie, getSeries, getShowReviews,
} from "./actionsAndThunks";
import { MoviesDBState, Status, ViewShowPayload } from "../types";

const initialState: MoviesDBState = {
  recentlyViewed: [],
  moviesList: [],
  seriesList: [],
  isSearching: false,
  status: Status.Idle,
  showToPreview: null,
  showInDetails: null,
  showReviews: [],
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder
    // view show details 
    .addCase(viewShow, (state, action: PayloadAction<ViewShowPayload>) => {
      const showsList = action.payload.showType === "movie" ? state.moviesList : state.seriesList;
      state.showToPreview = showsList.find(show => show.imdbID === action.payload.showId)!;
    })
    // search movies
    .addCase(searchMovies.pending, (state) => {
      state.status = Status.Loading;
      state.isSearching = true;
    }).addCase(searchMovies.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.status = Status.Success;
        state.moviesList = action.payload.Search!;
      } else state.status = Status.Failed;
      state.isSearching = false;
    }).addCase(searchMovies.rejected, (state) => {
      state.status = Status.Failed;
      state.moviesList = [];
      state.isSearching = false;
    })
    // search series
    .addCase(searchSeries.pending, (state) => {
      state.status = Status.Loading;
      state.isSearching = true;
    }).addCase(searchSeries.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.status = Status.Success;
        state.seriesList = action.payload.Search!;
      } else state.status = Status.Failed;
      state.isSearching = false;
    }).addCase(searchSeries.rejected, (state) => {
      state.status = Status.Failed;
      state.seriesList = [];
      state.isSearching = false;
    })
    // get movie by id
    .addCase(getMovie.pending, (state) => {
      state.status = Status.Loading;
      state.isSearching = true;
    }).addCase(getMovie.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.status = Status.Success;
        state.showInDetails = action.payload!;
      } else state.status = Status.Failed;
      state.isSearching = false;
    }).addCase(getMovie.rejected, (state) => {
      state.status = Status.Failed;
      state.moviesList = [];
      state.isSearching = false;
    })
    // get series by id
    .addCase(getSeries.pending, (state) => {
      state.status = Status.Loading;
      state.isSearching = true;
    }).addCase(getSeries.fulfilled, (state, action) => {
      state.isSearching = false;
      if (action.payload.Response) {
        state.status = Status.Success;
        state.showInDetails = action.payload;
      } else {
        state.status = Status.Failed;
      }
    }).addCase(getSeries.rejected, (state) => {
      state.status = Status.Failed;
      state.moviesList = [];
      state.isSearching = false;
    })
    // get show reviews
    .addCase(getShowReviews.pending, (state) => {
      state.status = Status.Loading;
    }).addCase(getShowReviews.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.Success;
        state.showReviews = action.payload;
      } else {
        state.status = Status.Failed;
      }
    }).addCase(getShowReviews.rejected, (state) => {
      state.status = Status.Failed;
      state.showReviews = [];
    })
    // default fallback case
    .addDefaultCase(state => state);
})

export default moviesReducer;
