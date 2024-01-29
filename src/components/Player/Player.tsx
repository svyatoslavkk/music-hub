import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { playPause } from "../../redux/slices/playerSlice";
import MiniPlayer from "../miniPlayer/MiniPlayer";
import ExpandedPlayer from "../expandedPlayer/ExpandedPlayer";

export default function Player() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const togglePlayerView = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  /************************* FOR AUDIO TAG ***********************/
  useEffect(() => {
    if (ref.current) {
      if (!isPlaying) {
        ref.current.play();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current && isPlaying) {
      ref.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  useEffect(() => {
    if (currentSongs.length) {
      dispatch(playPause(true));
    }
  }, [currentIndex]);

  return (
    <div>
      {isExpanded ? (
        <ExpandedPlayer
          onToggle={togglePlayerView}
          isPlaying={isPlaying}
          isActive={isActive}
          activeSong={activeSong}
          currentIndex={currentIndex}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          value={appTime}
          min={0}
          max={duration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
      ) : (
        <MiniPlayer
          onToggle={togglePlayerView}
          isPlaying={isPlaying}
          isActive={isActive}
          activeSong={activeSong}
          currentIndex={currentIndex}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          value={appTime}
          min={0}
          max={duration}
        />
      )}
      <audio
        src={activeSong?.soundFile}
        ref={ref}
        onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
        onLoadedData={(event: any) => setDuration(event.target.duration)}
      />
    </div>
  );
}
