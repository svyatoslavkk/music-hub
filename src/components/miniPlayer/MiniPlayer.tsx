import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { playPause } from "../../redux/slices/playerSlice";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

export default function MiniPlayer() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();
  const ref = useRef<HTMLAudioElement>(null);

  const img =
    "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36";
  const track = "Blinding Lights";
  const artists = "The Weeknd";

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  /************************* FOR AUDIO TAG ***********************/
  useEffect(() => {
    if (ref.current) {
      if (!isPlaying) {
        ref.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current && isPlaying) {
      ref.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSongs.length) {
      dispatch(playPause(true));
    }
  }, [currentIndex]);

  return (
    <div className="mini-player">
      <div className="flex-content">
        <img
          src={activeSong?.url ? activeSong?.url : img}
          className="small-circle-img"
          alt={activeSong?.track ? activeSong?.track : track}
        />
        <div className="text">
          <h3 className="small-header-white">
            {activeSong?.track ? activeSong?.track : track}
          </h3>
          <span className="small-text-white">
            {activeSong?.artists ? activeSong?.artists : artists}
          </span>
        </div>
      </div>
      <button className="blur-circle-btn" onClick={handlePlayPause}>
        {isPlaying ? (
          <PlayArrowRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
        ) : (
          <PauseRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
        )}
      </button>
      <audio src={activeSong?.soundFile} ref={ref} />
    </div>
  );
}
