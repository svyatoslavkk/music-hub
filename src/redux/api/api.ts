import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://spotify23.p.rapidapi.com/`,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "1eddc5ef0emsh738ebc426ef0396p1c723fjsn5aa6cc6d5d0a",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopTracks: builder.query({
      query: () => ({
        url: "tracks/",
        method: "GET",
        params: {
          ids: "4WNcduiCmDNfmTEz7JvmLv",
        },
      }),
    }),
    exploreTracks: builder.query({
      query: (params) => ({
        url: `search/`,
        params,
      }),
    }),
  }),
});

export const { useGetTopTracksQuery, useExploreTracksQuery } = api;
