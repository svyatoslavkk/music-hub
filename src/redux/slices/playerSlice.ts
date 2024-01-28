import { createSlice } from "@reduxjs/toolkit";

interface Track {
  img: string;
  track: string;
  artist: string;
}

interface MusicState {
  currentSongs: Track[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Track;
}

const initialState: MusicState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {} as Track,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.fetchMusic) {
        state.currentSongs = action.payload.fetchMusic;
      } else if (action.payload?.fetchMusic) {
        state.currentSongs = action.payload?.fetchMusic;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    // nextSong: (state, action: PayloadAction<number>) => {
    //   if (state.currentSongs[action.payload]?.track) {
    //     state.activeSong = state.currentSongs[action.payload]?.track;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    // prevSong: (state, action: PayloadAction<number>) => {
    //   if (state.currentSongs[action.payload]?.track) {
    //     state.activeSong = state.currentSongs[action.payload]?.track;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;
