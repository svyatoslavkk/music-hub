import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { ArtistAlt, PlayerProps } from "../../types/types";

export default function MiniPlayer({
  onToggle,
  isPlaying,
  isActive,
  activeSong,
  handlePlayPause,
  value,
  max,
}: PlayerProps) {
  const fakeImg =
    "https://static.vecteezy.com/system/resources/previews/000/630/395/non_2x/play-button-icon-design-illustration-vector.jpg";
  return (
    <>
      <div className="mini-player">
        {isActive && (
          <div className="progressbar">
            <svg className="progressbar__svg">
              <circle
                cx="29"
                cy="29"
                r="25"
                className="progressbar__svg-circle circle-js shadow-js"
                style={{
                  strokeDashoffset:
                    value !== undefined && max !== undefined
                      ? 155 - (155 * ((value / max) * 100)) / 100
                      : 0,
                }}
              >
                {" "}
              </circle>
            </svg>
          </div>
        )}
        <div className="left flex-content">
          <img
            src={activeSong?.image || activeSong?.img || fakeImg}
            className="small-circle-img"
            alt={activeSong?.title || activeSong?.name || "Track"}
          />
          <div className="text">
            <h3 className="small-header-white">
              {activeSong?.title || activeSong?.name || "Track"}
            </h3>
            <div style={{ display: "flex", gap: 4 }}>
              {(activeSong &&
                activeSong.artists &&
                activeSong.artists?.map((artist: ArtistAlt, i: number) => (
                  <span key={i} className="small-text-white">
                    {artist?.name || artist?.profile?.name}
                    {i < activeSong.artists.length - 1 ? "," : ""}
                  </span>
                ))) || <span className="small-text-white">Artist</span>}
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
              <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
            ) : (
              <PlayArrowRoundedIcon
                sx={{ color: "#d0d2d8" }}
                fontSize="medium"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
