import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { Artist, PlayerProps } from "../../types/types";

export default function MiniPlayer({
  onToggle,
  isPlaying,
  activeSong,
  handlePlayPause,
  value,
  max,
}: PlayerProps) {
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
              style={{
                strokeDashoffset: 155 - (155 * ((value / max) * 100)) / 100,
              }}
            >
              {" "}
            </circle>
          </svg>
        </div>
        <div className="left flex-content">
          <img
            src={activeSong?.image || activeSong?.img}
            className="small-circle-img"
            alt={activeSong?.title || activeSong?.name}
          />
          <div className="text">
            <h3 className="small-header-white">
              {activeSong?.title || activeSong?.name}
            </h3>
            <div style={{ display: "flex", gap: 4 }}>
              {activeSong &&
                activeSong.artists &&
                activeSong.artists?.map((artist: Artist, index: number) => (
                  <span
                    key={artist?.id || artist?.profile?.uri}
                    className="small-text-white"
                  >
                    {artist?.name || artist?.profile?.name}
                    {index < activeSong.artists.length - 1 ? "," : ""}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="right">
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
