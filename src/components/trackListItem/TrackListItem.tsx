import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { formatMillisecondsToMMSS } from "../../utils/formatMillisecondsToMMSS";
import { ArtistAlt } from "../../types/types";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../../redux/slices/playerSlice";

export default function TrackListItem({
  key,
  song,
  filteredAllMusic,
  isPlaying,
  activeSong,
  i,
}: any) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, filteredAllMusic, i }));
    dispatch(playPause(true));
  };

  return (
    <div key={key} className="track-item">
      <div className="left flex-content">
        <img src={song?.img} className="small-circle-img" alt="Track" />
        {isPlaying && activeSong?.title === song.name ? (
          <button
            className="play-pause-btn blur-circle-btn"
            onClick={handlePauseClick}
          >
            <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
          </button>
        ) : (
          <button
            className="play-pause-btn blur-circle-btn"
            onClick={handlePlayClick}
          >
            <PlayArrowRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
          </button>
        )}
        <div>
          <h3 className="small-header-white">{song?.name}</h3>
          <div className="flex-content">
            {song?.artists.map((artist: ArtistAlt, index: number) => (
              <span key={artist?.profile?.uid} className="small-text-white">
                {artist?.profile?.name}
                {index < song?.artists.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="right flex-content">
        <span className="fav-icon">
          <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d8" }} />
        </span>
        <p className="small-text-white">
          {formatMillisecondsToMMSS(song?.duration)}
        </p>
      </div>
    </div>
  );
}
