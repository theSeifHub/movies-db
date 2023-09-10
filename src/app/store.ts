import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from './reducer';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: moviesReducer,
});

export const selectMoviesList = (state: RootState) => state.moviesList;
export const selectSeriesList = (state: RootState) => state.seriesList;
export const selectSelectedShowId = (state: RootState) => state.selectedShowId;
export const selectRecentlyViewed = (state: RootState) => state.recentlyViewed;
export const selectSelectedShowInDetails = (state: RootState) => state.selectedShowInDetails;
export const selectIsSearching = (state: RootState) => state.isSearching;
export const selectSearchStatus = (state: RootState) => state.searchStatus;
export const selectGetOneStatus = (state: RootState) => state.getOneStatus;
