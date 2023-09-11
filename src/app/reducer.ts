import {
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  addToRecentlyViewed, searchMovies, searchSeries, getShow, getShowReviews, getRecentlyViewed,
} from "./actionsAndThunks";
import { MoviesDBState, Status, RecentlyViewedPayload } from "../types";

const initialState: MoviesDBState = {
  recentlyViewed: [],
  moviesList: [],
  seriesList: [],
  isSearching: false,
  searchStatus: Status.Idle,
  getOneStatus: Status.Idle,
  selectedShowId: null,
  selectedShowInDetails: null,
  showReviews: [],
};

const moviesReducer = createReducer(initialState, (builder) => {
  builder
    // recently viewed list
    .addCase(addToRecentlyViewed, (state, action: PayloadAction<RecentlyViewedPayload>) => {
      let recentlyViewedLS = localStorage.getItem("recentlyViewedShows");
      let recentlyViewedArray: RecentlyViewedPayload[] = [];
      if (recentlyViewedLS) recentlyViewedArray = JSON.parse(recentlyViewedLS);
      recentlyViewedArray.push(action.payload);
      localStorage.setItem("recentlyViewedShows", JSON.stringify(recentlyViewedArray));
      state.recentlyViewed = [...recentlyViewedArray];
    })
    .addCase(getRecentlyViewed, (state) => {
      let recentlyViewedLS = localStorage.getItem("recentlyViewedShows");
      let recentlyViewedArray: RecentlyViewedPayload[] = [];
      if (recentlyViewedLS) recentlyViewedArray = JSON.parse(recentlyViewedLS);
      state.recentlyViewed = [...recentlyViewedArray];
    })
    // search movies
    .addCase(searchMovies.pending, (state) => {
      state.searchStatus = Status.Loading;
      state.isSearching = true;
    }).addCase(searchMovies.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.searchStatus = Status.Success;
        state.moviesList = action.payload.Search!;
      } else state.searchStatus = Status.Failed;
      state.isSearching = false;
    }).addCase(searchMovies.rejected, (state) => {
      state.searchStatus = Status.Failed;
      state.moviesList = [];
      state.isSearching = false;
    })
    // search series
    .addCase(searchSeries.pending, (state) => {
      state.searchStatus = Status.Loading;
      state.isSearching = true;
    }).addCase(searchSeries.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.searchStatus = Status.Success;
        state.seriesList = action.payload.Search!;
      } else state.searchStatus = Status.Failed;
      state.isSearching = false;
    }).addCase(searchSeries.rejected, (state) => {
      state.seriesList = [];
      state.searchStatus = Status.Failed;
      state.isSearching = false;
    })
    // get show by id
    .addCase(getShow.pending, (state, action) => {
      state.getOneStatus = Status.Loading;
      state.selectedShowId = action.meta.arg.showId
      state.selectedShowInDetails = null;
    }).addCase(getShow.fulfilled, (state, action) => {
      if (action.payload.Response) {
        state.getOneStatus = Status.Success;
        state.selectedShowInDetails = action.payload!;
      } else state.getOneStatus = Status.Failed;
    }).addCase(getShow.rejected, (state) => {
      state.selectedShowInDetails = null;
      state.getOneStatus = Status.Failed;
    })
    // get show reviews
    .addCase(getShowReviews.pending, (state) => {
      state.searchStatus = Status.Loading;
    }).addCase(getShowReviews.fulfilled, (state, action) => {
      if (action.payload) {
        state.searchStatus = Status.Success;
        state.showReviews = action.payload;
      } else {
        state.searchStatus = Status.Failed;
      }
    }).addCase(getShowReviews.rejected, (state) => {
      state.searchStatus = Status.Failed;
      state.showReviews = [];
    })
    // default fallback case
    .addDefaultCase(state => state);
})

export default moviesReducer;
