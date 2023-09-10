interface Rating {
  Source: string;
  Value: string;
}

export enum ShowType {
  Movie = "movie",
  Series = "series",
}

export interface IAbstractShow {
  Title: string;
  Year: string;
  imdbID: string;
  Type: ShowType;
  Poster: string;
  Rated: string;
}

interface IAbstractShowFullDetails extends IAbstractShow {
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

export interface IMovie extends IAbstractShow {}
export interface IMovieFullDetails extends IAbstractShowFullDetails {}

export interface ISeries extends IAbstractShow {}
export interface ISeriesFullDetails extends IAbstractShowFullDetails {}

export enum Status{
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface MoviesDBState {
  status: Status;
  isSearching: boolean;
  recentlyViewed: IAbstractShow[];
  moviesList: IMovie[];
  seriesList: ISeries[];
  showToPreview: IAbstractShow | null;
  showInDetails: IAbstractShowFullDetails | null;
  showReviews: INYTimesReview[];
}

export interface SearchResults {
  Response: boolean;
  Search?: IAbstractShow[];
  totalResults?: number;
}
export interface ViewShowPayload{
  showId: string;
  showType: ShowType;
}


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