import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Artist } from "../../types/types";
import { PlayerProps } from "../../types/types";

export default function ExpandedPlayer({
  onToggle,
  isPlaying,
  activeSong,
  handlePlayPause,
  value,
  min,
  max,
  setSeekTime,
}: PlayerProps) {
  const fakeImg =
    "https://static.vecteezy.com/system/resources/previews/000/630/395/non_2x/play-button-icon-design-illustration-vector.jpg";
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <>
      <div className="expanded-player">
        <div className="track-info">
          <div></div>
          <div className="flex-content">
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
                  activeSong.artists.map((artist: Artist, i: number) => (
                    <span key={i} className="small-text-white">
                      {artist?.name || artist?.profile?.name}
                      {i < activeSong.artists.length - 1 ? "," : ""}
                    </span>
                  ))) || <span className="small-text-white">Artist</span>}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="buttons">
          <button className="transparent-btn">
            <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
          <button className="blur-circle-btn">
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
          <button className="blur-circle-btn">
            <SkipNextRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
          <button className="transparent-btn" onClick={onToggle}>
            <ExpandMoreRoundedIcon
              sx={{ color: "#d0d2d8" }}
              fontSize="medium"
            />
          </button>
        </div>
        <label className="line-bar">
          <span className="small-text-white">
            {value === 0 ? "0:00" : getTime(value)}
          </span>
          <input
            type="range"
            className="input-range"
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
    </>
  );
}
