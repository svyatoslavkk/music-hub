import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://spotify23.p.rapidapi.com/`,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "7214b7b83bmsh2d821b055272b58p1583e3jsndf18dd342dd3",
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
