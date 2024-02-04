import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { formatMillisecondsToMMSS } from "../../utils/formatMillisecondsToMMSS";
import { ArtistAlt } from "../../types/types";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../../redux/slices/playerSlice";
import { useMusicContext } from "../../context/MusicContext";
import { doc, collection } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import {
  isFavoriteSong,
  handleAddToFavorites,
} from "../../utils/favoritesUtils";

export default function TrackListItem({
  song,
  filteredAllMusic,
  isPlaying,
  activeSong,
  i,
}: any) {
  const { user, users, setUsers } = useMusicContext();
  const collectionRef = collection(database, "Users Data");
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const userDocRef = myData ? doc(collectionRef, myData.docId) : "";
  const dispatch = useDispatch();

  const isFavorite = isFavoriteSong(myData, song);
  const handleFavorites = () => {
    handleAddToFavorites(userDocRef, myData, user, song, setUsers);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, filteredAllMusic, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      key={song?.id}
      className="track-item"
      style={{
        backgroundColor:
          isPlaying && activeSong?.id === song?.id ? "#ffd14744" : "#ffffff22",
      }}
    >
      <div className="left flex-content">
        <div className="i">
          <span className="small-header-white">{i + 1}</span>
        </div>
        <img
          src={song?.img || song?.image}
          className="small-circle-img"
          alt="Track"
        />
        {isPlaying && activeSong?.id === song?.id ? (
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
          <h3 className="small-header-white">{song?.name || song?.title}</h3>
          <div style={{ display: "flex", gap: 4 }}>
            {song?.artists.map((artist: ArtistAlt, i: number) => (
              <span key={i} className="small-text-white">
                {artist?.profile?.name || artist?.name}
                {i < song?.artists.length - 1 ? (
                  <span className="small-text-white">,</span>
                ) : (
                  ""
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="right flex-content">
        <div className="music-anim-wrapper">
          {isPlaying && activeSong?.id === song?.id ? (
            <div className="music-anim">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}></span>
              ))}
            </div>
          ) : null}
        </div>
        {isFavorite ? (
          <button className="transparent-btn" onClick={handleFavorites}>
            <FavoriteRoundedIcon sx={{ color: "#dfbf60" }} />
          </button>
        ) : (
          <button className="transparent-btn" onClick={handleFavorites}>
            <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d899" }} />
          </button>
        )}
        <p className="small-text-white">
          {formatMillisecondsToMMSS(song?.duration)}
        </p>
      </div>
    </div>
  );
}
