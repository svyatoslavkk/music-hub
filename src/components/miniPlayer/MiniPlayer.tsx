import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Artist, PlayerProps } from "../../types/types";

export default function MiniPlayer({
  onToggle,
  isPlaying,
  isActive,
  activeSong,
  currentIndex,
  currentSongs,
  handlePlayPause,
}: PlayerProps) {
  const reserveImg =
    "https://images.genius.com/1d88f9c0c8623d60cf6d85ad3b38a6de.999x999x1.png";

  return (
    <>
      <div className="mini-player">
        <div className="progressbar">
          <svg className="progressbar__svg">
            <circle
              cx="29"
              cy="29"
              r="25"
              className="progressbar__svg-circle circle-js shadow-js"
            >
              {" "}
            </circle>
          </svg>
        </div>
        <div className="flex-content">
          <img
            src={activeSong?.image ? activeSong?.image : reserveImg}
            className="small-circle-img"
            alt={activeSong?.title ? activeSong?.title : "Track"}
          />
          <div className="text">
            <h3 className="small-header-white">
              {activeSong?.title ? activeSong?.title : "Artist"}
            </h3>
            <div className="flex-content">
              {activeSong &&
                activeSong.artists &&
                activeSong.artists.map((artist: Artist, index: number) => (
                  <span key={artist.id} className="small-text-white">
                    {artist.name}
                    {index < activeSong.artists.length - 1 ? "," : ""}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="transparent-btn" onClick={onToggle}>
            <ExpandLessRoundedIcon
              sx={{ color: "#d0d2d8" }}
              fontSize="medium"
            />
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
        </div>
      </div>
    </>
  );
}
