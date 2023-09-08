import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from './reducer';

export const store = configureStore({
  reducer: moviesReducer,
});

export const selectMoviesList = (state: RootState) => state.moviesList;
export const selectSeriesList = (state: RootState) => state.seriesList;
export const selectPictureToView = (state: RootState) => state.showToView;
export const selectIsSearching = (state: RootState) => state.isSearching;
export const selectStatus = (state: RootState) => state.status;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
