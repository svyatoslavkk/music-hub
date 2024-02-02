import { createSlice } from "@reduxjs/toolkit";
import { Song } from "../../types/types";

interface MusicState {
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song;
}

export interface RootState {
  player: MusicState;
}

const initialState: MusicState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {} as Song,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.fetchMusic) {
        state.currentSongs = action.payload.fetchMusic;
      } else if (action.payload?.allMusic) {
        state.currentSongs = action.payload?.allMusic;
      } else if (action.payload?.filteredAllMusic) {
        state.currentSongs = action.payload?.filteredAllMusic;
      } else if (action.payload?.favList) {
        state.currentSongs = action.payload?.favList;
      } else if (action.payload?.music) {
        state.currentSongs = action.payload?.music;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } =
  playerSlice.actions;

export default playerSlice.reducer;
