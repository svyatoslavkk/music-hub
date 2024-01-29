import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import { Artist } from "../../types/types";
import { PlayerProps } from "../../types/types";

export default function ExpandedPlayer({
  onToggle,
  isPlaying,
  isActive,
  activeSong,
  currentIndex,
  currentSongs,
  handlePlayPause,
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
}: PlayerProps) {
  const img =
    "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36";
  const track = "Blinding Lights";

  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <>
      <div className="expanded-player">
        <div className="track-info">
          <div></div>
          <div className="flex-content">
            <img
              src={activeSong?.image ? activeSong?.image : img}
              className="small-circle-img"
              alt={activeSong?.title ? activeSong?.title : track}
            />
            <div className="text">
              <h3 className="small-header-white">
                {activeSong?.title ? activeSong?.title : track}
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
          <button className="transparent-btn" onClick={onToggle}>
            <ExpandMoreRoundedIcon
              sx={{ color: "#d0d2d8" }}
              fontSize="medium"
            />
          </button>
        </div>
        <div className="buttons">
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
