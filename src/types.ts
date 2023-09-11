interface Rating {
  Source: string;
  Value: string;
}

export enum ShowType {
  Movie = "movie",
  Series = "series",
}

export interface IShow {
  Title: string;
  Year: string;
  imdbID: string;
  Type: ShowType;
  Poster: string;
}

export interface IShowFullDetails extends IShow {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[]
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IMovie extends IShow {}
export interface IMovieFullDetails extends IShowFullDetails {}

export interface ISeries extends IShow {}
export interface ISeriesFullDetails extends IShowFullDetails {}

export enum Status{
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface MoviesDBState {
  searchStatus: Status;
  getOneStatus: Status;
  isSearching: boolean;
  recentlyViewed: IShow[];
  moviesList: IMovie[];
  seriesList: ISeries[];
  selectedShowId: string | null;
  selectedShowInDetails: IShowFullDetails | null;
  showReviews: INYTimesReview[];
}

export interface SearchResults {
  Response: boolean;
  Search?: IShow[];
  totalResults?: number;
}
export interface ViewShowPayload{
  showId: string;
  showType: ShowType;
}

export interface RecentlyViewedPayload extends IShow {}

export interface INYTimesReview {
  abstract: string;
  web_url: string;
  snippet: string;
  source: string;
  headline: {
    main: string;
    print_headline: string;
    name: string | null;
  };
  pub_date: string;
  document_type: "article";
  section_name: "Movies";
  type_of_material: "Review";
  word_count: number;
}