import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  nextSong,
  prevSong,
  playPause,
  RootState,
} from "../../redux/slices/playerSlice";
import MiniPlayer from "../miniPlayer/MiniPlayer";
import ExpandedPlayer from "../expandedPlayer/ExpandedPlayer";
import { useMusicContext } from "../../context/MusicContext";
import { collection, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import PlayerDesktop from "../shared/playerDesktop/PlayerDesktop";
import { ArtistAlt, SongAlt, User } from "../../types/types";
import { MAX_RECENT_TRACKS } from "../../constants/constants";

export default function Player() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state: RootState) => state.player);
  const { user, users, isExpanded, togglePlayerView } = useMusicContext();
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const dispatch = useDispatch();
  const ref = useRef<HTMLAudioElement>(null);
  const collectionRef = collection(database, "Users Data");
  const myData: User | null =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const userDocRef = myData ? myData.docId : null;

  useEffect(() => {
    if (currentSongs.length) {
      dispatch(playPause(true));
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleTrackCompletion = async () => {
    const currentDate = new Date();
    if (userDocRef && activeSong) {
      const listenedTrackData: SongAlt = {
        id: activeSong?.id,
        img: activeSong?.img,
        name: activeSong?.name,
        soundFile: activeSong?.soundFile,
        duration: activeSong?.duration,
        artists:
          activeSong?.artists.map((artist: ArtistAlt) => ({
            name: artist?.profile?.name || artist?.name,
            uri: artist?.profile?.uri || artist?.uri,
          })) || [],
      };

      const songTimesData: SongAlt = {
        id: activeSong?.id,
        img: activeSong?.img,
        name: activeSong?.name,
        soundFile: activeSong?.soundFile,
        duration: activeSong?.duration,
        artists: activeSong?.artists.map((artist: ArtistAlt) => ({
          name: artist?.profile?.name || artist?.name,
          uri: artist?.profile?.uri || artist?.uri,
        })),
        count: {
          date: currentDate.toISOString(),
          count: 1,
        },
      };

      const currentArray = myData?.recentTracks;
      const listenedTimesArray = myData?.listenedTimes;
      console.log("listenedTimesArray", listenedTimesArray);

      const isThere = myData?.recentTracks.some(
        (song) => song?.id === listenedTrackData?.id,
      );

      if (currentArray && listenedTimesArray) {
        if (currentArray.length >= MAX_RECENT_TRACKS) {
          currentArray.shift();
        }
        currentArray.push(listenedTrackData);
        listenedTimesArray.push(songTimesData);
      }

      try {
        if (!isThere) {
          await updateDoc(doc(collectionRef, userDocRef), {
            recentTracks: currentArray,
          });
        }
        await updateDoc(doc(collectionRef, userDocRef), {
          listenedTimes: listenedTimesArray,
        });
      } catch (error) {
        console.error("Error updating listenedTracks:", error);
      }
    }
  };

  const handleEnded = async () => {
    handleNextSong();
    handleTrackCompletion();
  };

  // const handleTimeUpdate = async (event: any) => {
  //   const currentTime = event.target.currentTime;
  //   const duration = event.target.duration;
  //   const fixedCurrentTime = currentTime.toFixed(0);
  //   const fixedDuration = (duration * 0.99).toFixed(0);
  //   setAppTime(currentTime);
  //   if (fixedCurrentTime === fixedDuration && !hasEnded && repeat) {
  //     handleTrackCompletion();
  //     setHasEnded(true);
  //   } else if (
  //     fixedCurrentTime < fixedDuration ||
  //     fixedCurrentTime > fixedDuration
  //   ) {
  //     setHasEnded(false);
  //   }
  // };

  /************************* FOR AUDIO TAG ***********************/
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

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
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      {isExpanded ? (
        <ExpandedPlayer
          onToggle={togglePlayerView}
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          activeSong={activeSong}
          currentIndex={currentIndex}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
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
          handlePlayPause={handlePlayPause}
          value={appTime}
          max={duration}
        />
      )}
      <PlayerDesktop
        onToggle={togglePlayerView}
        isPlaying={isPlaying}
        isActive={isActive}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        activeSong={activeSong}
        currentIndex={currentIndex}
        currentSongs={currentSongs}
        handlePlayPause={handlePlayPause}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        value={appTime}
        min={0}
        max={duration}
        onInput={(event: any) => setSeekTime(event.target.value)}
        setSeekTime={setSeekTime}
        appTime={appTime}
        volume={volume}
        setVolume={setVolume}
      />
      <audio
        src={activeSong?.soundFile}
        ref={ref}
        loop={repeat}
        onEnded={handleEnded}
        onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
        onLoadedData={(event: any) => setDuration(event.target.duration)}
      />
    </>
  );
}
