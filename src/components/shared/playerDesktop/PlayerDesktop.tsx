import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { Artist, PlayerProps } from "../../../types/types";

export default function PlayerDesktop({
  onToggle,
  isPlaying,
  isActive,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  activeSong,
  currentIndex,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  value,
  min,
  max,
  onInput,
  appTime,
  setSeekTime,
  volume,
  setVolume,
}: PlayerProps) {
  const fake =
    "https://i.scdn.co/image/ab67616100005174f2db81b3312a1f167fc54096";
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  return (
    <div className="player-desktop">
      <img
        src={activeSong?.image || activeSong?.img || fake}
        className="image"
        alt={activeSong?.title || activeSong?.name || "Track"}
      />
      <div className="controller">
        <div>
          <div style={{ display: "flex", gap: 4 }}>
            {(activeSong &&
              activeSong.artists &&
              activeSong.artists.map((artist: Artist, i: number) => (
                <span key={i} className="mid-text-white">
                  {artist?.name || artist?.profile?.name}
                  {i < activeSong.artists.length - 1 ? "," : ""}
                </span>
              ))) || <span className="mid-text-white">Artist</span>}
          </div>
          <h3 className="big-header-white">
            {activeSong?.title || activeSong?.name || "Track"}
          </h3>
        </div>
        <div className="buttons">
          <button className="transparent-btn">
            <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
          <div className="play-pause">
            <button className="blur-circle-btn" onClick={handlePrevSong}>
              <SkipPreviousRoundedIcon sx={{ color: "#d0d2d8" }} />
            </button>
            <button className="blur-circle-btn" onClick={handlePlayPause}>
              {isPlaying ? (
                <PlayArrowRoundedIcon
                  sx={{ color: "#d0d2d8" }}
                  fontSize="medium"
                />
              ) : (
                <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
              )}
            </button>
            <button className="blur-circle-btn" onClick={handleNextSong}>
              <SkipNextRoundedIcon sx={{ color: "#d0d2d8" }} />
            </button>
          </div>
          <button
            className="transparent-btn"
            onClick={() => setRepeat((prev) => !prev)}
          >
            <LoopRoundedIcon sx={{ color: repeat ? "#dfbf60" : "#d0d2d8" }} />
          </button>
        </div>
        <label className="line-bar">
          <span className="small-text-white">
            {value === 0 ? "0:00" : getTime(value)}
          </span>
          <input
            type="range"
            className="input-range seek"
            value={value}
            min={min}
            max={max}
            onInput={(event: any) => setSeekTime(event.target.value)}
          />
          <span className="small-text-white">
            {max === 0 ? "0:00" : getTime(max)}
          </span>
        </label>
      </div>
      <div className="volume">
        <button className="volume-btn">
          <VolumeUpRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
        </button>
        <label className="volume-trigger">
          <input
            type="range"
            className="volume-range"
            value={volume * 100}
            min="0"
            max="100"
            onChange={(event) => setVolume(event.target.value / 100)}
          />
        </label>
      </div>
    </div>
  );
}
