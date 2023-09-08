interface IAbstractShow {
  id: number | string;
  title: string;
  posterUrl: string;
  rating: string;
  description: string;
}

export interface IMovie extends IAbstractShow {}

export interface ISeries extends IAbstractShow {}

export enum Status{
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface MoviesDBState {
  recentlyViewed: IAbstractShow[];
  isSearching: boolean;
  searchResults?: (IAbstractShow | undefined)[];
  moviesList: IMovie[];
  seriesList: ISeries[];
  showToView: IAbstractShow | null,
  status: Status;
}

export interface GetMoviesResponse {
  movies: IMovie[];
  count: number;
}