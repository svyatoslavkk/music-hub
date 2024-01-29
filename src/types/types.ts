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
  profile: {
    name: string;
  };
};
