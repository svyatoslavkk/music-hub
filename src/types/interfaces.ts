import { SongAlt, Stat } from "./types";

export interface SplideOptions {
  type: string;
  perMove: number;
  rewind?: boolean;
  height: string;
  pagination: boolean;
  gap: string;
  arrows: boolean;
  autoWidth: boolean;
}

export interface HeaderProps {
  plImage: string | JSX.Element;
  plTitle: string;
  plDesc: string;
  stats: Stat[];
}

export interface TopFiveChartProps {
  topFiveSongsDetails: SongAlt[];
}
