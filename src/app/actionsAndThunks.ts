import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IShowFullDetails,
  INYTimesReview,
  SearchResults,
  ViewShowPayload,
  RecentlyViewedPayload,
} from "../types";
import OMDbAxios from "../axios/OMDbInstance";
import NYTimesAxios from "../axios/NYTimesInstance";

// actions
export const addToRecentlyViewed = createAction<RecentlyViewedPayload>('show/addRecentlyViewed');
export const getRecentlyViewed = createAction('show/getRecentlyViewed');

// thunks
export const searchMovies = createAsyncThunk(
  'movies/searchAsync',
  async (searchQuery: string, thunkAPI): Promise<SearchResults> => {
    const response = await OMDbAxios.get("", {
      params: {
        s: searchQuery,
        type: "movie",
      }
    });
    return response.data;
  },
);

export const getShow = createAsyncThunk(
  'show/getOneAsync',
  async (viewShowPayload: ViewShowPayload, thunkAPI): Promise<IShowFullDetails> => {
    const response = await OMDbAxios.get("", {
      params: {
        i: viewShowPayload.showId,
        type: viewShowPayload.showType,
      }
    });
    return response.data;
  },
);

export const searchSeries = createAsyncThunk(
  'series/searchAsync',
  async (searchQuery: string, thunkAPI): Promise<SearchResults> => {
    const response = await OMDbAxios.get("", {
      params: {
        s: searchQuery,
        type: "series",
      }
    });
    return response.data;
  },
);

export const getShowReviews = createAsyncThunk(
  'show/getReviewsAsync',
  async (showTitle: string, thunkAPI): Promise<INYTimesReview[]> => {
    const response = await NYTimesAxios.get("", {
      params: {
        fq: `section_name%3A%22Movies%22%20AND%20type_of_material%3A%22Review%22%20AND%20document_type%3A%22article%22%20AND%20headline%3A%22${showTitle}%22`,
      }
    });

    const filteredResponse: INYTimesReview[] = [];

    response.data.response.docs.forEach((doc: any, i: number) => {
      if (i < 5) {
        filteredResponse.push({
          abstract: doc.abstract,
          snippet: doc.snippet,
          headline: {
            main: doc.headline.main,
            name: doc.headline.name,
            print_headline: doc.headline.print_headline,
          },
          pub_date: new Date(doc.pub_date).toDateString(),
          web_url: doc.web_url,
          word_count: doc.word_count,
          source: doc.source,
          section_name: doc.section_name,
          type_of_material: doc.type_of_material,
          document_type: doc.document_type,
        } as INYTimesReview);
      }
    });


    return filteredResponse;
  },
);