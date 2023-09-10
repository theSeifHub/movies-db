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
export const selectShowToPreview = (state: RootState) => state.showToPreview;
export const selectRecentlyViewed = (state: RootState) => state.recentlyViewed;
export const selectShowInDetails = (state: RootState) => state.showInDetails;
export const selectIsSearching = (state: RootState) => state.isSearching;
export const selectStatus = (state: RootState) => state.status;
