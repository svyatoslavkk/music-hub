import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../../redux/slices/playerSlice";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

export default function DropItem({
  key,
  song,
  slides,
  isPlaying,
  activeSong,
  i,
}: any) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, slides, i }));
    dispatch(playPause(true));
  };

  return (
    <>
      <div className="drop-item" key={key}>
        <img className="large-sq-img" src={song.url} alt={song.track} />
        <div className="drop-item-overlay"></div>
        <div className="info">
          <div className="text">
            <h3 className="small-header-white">{song.track}</h3>
            <span className="small-text-white">{song.artists}</span>
          </div>
        </div>
        <span className="btn">
          {isPlaying && activeSong?.track === song.track ? (
            <button className="transparent-btn" onClick={handlePauseClick}>
              <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="large" />
            </button>
          ) : (
            <button className="transparent-btn" onClick={handlePlayClick}>
              <PlayArrowRoundedIcon
                sx={{ color: "#d0d2d8" }}
                fontSize="large"
              />
            </button>
          )}
        </span>
      </div>
    </>
  );
}
