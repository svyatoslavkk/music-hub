import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../../redux/slices/playerSlice";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { Artist } from "../../types/types";

export default function DropItem({
  key,
  song,
  music,
  isPlaying,
  activeSong,
  i,
}: any) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, music, i }));
    dispatch(playPause(true));
  };

  const handleItemClick = () => {
    if (isPlaying && activeSong?.title === song.title) {
      handlePauseClick();
    } else {
      handlePlayClick();
    }
  };

  return (
    <>
      <div className="drop-item" key={key} onClick={handleItemClick}>
        <img
          className="large-sq-img"
          src={song?.image || song?.img}
          alt={song.title}
        />
        <div className="drop-item-overlay"></div>
        <div className="info">
          <div className="text">
            <h3 className="small-header-white">{song?.title || song?.name}</h3>
            <div className="flex-content">
              {song?.artists.map((artist: Artist, index: number) => (
                <span key={artist.id} className="small-text-white">
                  {artist?.name || artist?.profile?.name}
                  {index < song.artists.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className="btn">
          {isPlaying && activeSong?.id === song?.id ? (
            <button className="transparent-btn">
              <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="large" />
            </button>
          ) : (
            <button className="transparent-btn">
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
