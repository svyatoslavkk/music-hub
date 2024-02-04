import { SetStateAction } from "react";

export type User = {
  avatar: string;
  docId: string;
  email: string;
  favTracks: SongAlt[];
  recentTracks: SongAlt[];
  listenedTimes: SongAlt[];
  uid: string;
  userName: string;
  listeningStats: {};
};

export type Song = {
  id: string;
  title: string;
  artists: [];
  soundFile: string;
  image: string;
};

export type SongAlt = {
  id: string;
  name: string;
  artists: [];
  count: number;
  soundFile: string;
  img: string;
  duration: number;
  playlist: string;
  release_date: string;
};

export type Artist = {
  id: string;
  name: string;
};

export type ArtistAlt = {
  name?: string;
  profile: {
    uri: string;
    name: string;
  };
  uri?: string;
};

export type Playlist = {
  description: string;
  id: string;
  image: string;
  name: string;
};

export type Stat = {
  value: number | string;
  key: string;
};

export interface PlayerProps {
  onToggle?: () => void;
  isPlaying: boolean;
  isActive: boolean;
  activeSong: SongAlt;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  currentSongs: Song[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
  value?: number;
  min?: number;
  max?: number;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSeekTime?: React.Dispatch<SetStateAction<number>>;
  appTime?: number;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}
