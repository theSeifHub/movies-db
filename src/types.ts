interface IAbstractPicture {
  title: string;
  posterUrl: string;
}

export interface IMovie extends IAbstractPicture {}

export interface ISeries extends IAbstractPicture {}

export enum Status{
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface MoviesDBState {
  recentlyViewed: IAbstractPicture[];
  isSearching: boolean;
  searchResults?: (IAbstractPicture | undefined)[];
  moviesList: IMovie[];
  seriesList: ISeries[];
  pictureToView: IAbstractPicture | null,
  status: Status;
}

export interface GetMoviesResponse {
  movies: IMovie[];
  count: number;
}