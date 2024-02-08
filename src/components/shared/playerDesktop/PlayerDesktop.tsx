import { useMusicContext } from "../../../context/MusicContext";
import { doc, collection } from "firebase/firestore";
import { database } from "../../../firebase/firebase";
import { ArtistAlt, PlayerProps } from "../../../types/types";
import {
  handleAddToFavorites,
  isFavoriteSong,
} from "../../../utils/favoritesUtils";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

export default function PlayerDesktop({
  isPlaying,
  repeat,
  setRepeat,
  activeSong,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  value,
  min,
  max,
  setSeekTime,
  volume,
  setVolume,
}: PlayerProps) {
  const { user, users, setUsers } = useMusicContext();
  const collectionRef = collection(database, "Users Data");
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const userDocRef = myData ? doc(collectionRef, myData.docId) : null;
  const fake =
    "https://static.vecteezy.com/system/resources/previews/000/630/395/non_2x/play-button-icon-design-illustration-vector.jpg";
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  const isFavorite = isFavoriteSong(myData, activeSong);
  const handleFavorites = () => {
    if (userDocRef) {
      handleAddToFavorites(userDocRef, myData, user, activeSong, setUsers);
    }
  };

  return (
    <div className="player-desktop">
      <img
        src={activeSong?.img || fake}
        className="image"
        alt={activeSong?.name || "Track"}
      />
      <div className="controller">
        <div>
          <div style={{ display: "flex", gap: 4 }}>
            {(activeSong &&
              activeSong.artists &&
              activeSong.artists.map((artist: ArtistAlt, i: number) => (
                <span key={i} className="mid-text-white">
                  {artist?.name || artist?.profile?.name}
                  {i < activeSong.artists.length - 1 ? "," : ""}
                </span>
              ))) || <span className="mid-text-white">Artist</span>}
          </div>
          <h3 className="big-header-white">{activeSong?.name || "Track"}</h3>
        </div>
        <div className="buttons">
          {isFavorite ? (
            <button className="transparent-btn" onClick={handleFavorites}>
              <FavoriteRoundedIcon sx={{ color: "#dfbf60" }} />
            </button>
          ) : (
            <button className="transparent-btn" onClick={handleFavorites}>
              <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d899" }} />
            </button>
          )}
          <div className="play-pause">
            <button className="blur-circle-btn" onClick={handlePrevSong}>
              <SkipPreviousRoundedIcon sx={{ color: "#d0d2d8" }} />
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
            <button className="blur-circle-btn" onClick={handleNextSong}>
              <SkipNextRoundedIcon sx={{ color: "#d0d2d8" }} />
            </button>
          </div>
          <button
            className="transparent-btn"
            onClick={() => setRepeat && setRepeat((prev: boolean) => !prev)}
          >
            <LoopRoundedIcon sx={{ color: repeat ? "#dfbf60" : "#d0d2d8" }} />
          </button>
        </div>
        <label className="line-bar">
          <span className="small-text-white">
            {value === undefined ? "0:00" : getTime(value)}
          </span>
          <input
            type="range"
            className="input-range seek"
            value={value || 0}
            min={min || 0}
            max={max || 100}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSeekTime && setSeekTime(Number(event.target.value))
            }
          />
          <span className="small-text-white">
            {max === undefined ? "0:00" : getTime(max)}
          </span>
        </label>
      </div>
      <div className="volume">
        <button className="volume-btn">
          <VolumeUpRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
        </button>
        <label className="volume-trigger">
          <input
            type="range"
            className="volume-range"
            value={volume !== undefined ? volume * 100 : 0}
            min="0"
            max="100"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setVolume && setVolume(Number(event.target.value) / 100)
            }
          />
        </label>
      </div>
    </div>
  );
}
