import { SetStateAction } from "react";

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
  soundFile: string;
  img: string;
  duration: number;
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

export interface PlayerProps {
  onToggle?: () => void;
  isPlaying: boolean;
  isActive: boolean;
  activeSong: Song;
  currentIndex: number;
  currentSongs: Song[];
  handlePlayPause: () => void;
  value?: number;
  min?: number;
  max?: number;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSeekTime?: React.Dispatch<SetStateAction<number>>;
  appTime?: number;
}
