import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { formatMillisecondsToMMSS } from "../../utils/formatMillisecondsToMMSS";
import { ArtistAlt, SongAlt } from "../../types/types";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../../redux/slices/playerSlice";
import { useMusicContext } from "../../context/MusicContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { database } from "../../firebase/firebase";

export default function TrackListItem({
  key,
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
  const userDocRef = myData ? doc(collectionRef, myData.docId) : null;
  const dispatch = useDispatch();

  const isFavoriteSong = myData?.favTracks.some(
    (favTrack: SongAlt) => favTrack.id === song.id,
  );

  const handleAddToFavorites = async () => {
    if (userDocRef) {
      const favoriteMusicData = {
        id: song?.id,
        img: song?.img,
        name: song?.name,
        soundFile: song?.soundFile,
        duration: song?.duration,
        artists: song?.artists.map((artist: ArtistAlt) => ({
          name: artist?.profile?.name || artist?.name,
          uri: artist?.profile?.uri || artist?.uri,
        })),
      };
      try {
        if (isFavoriteSong) {
          await updateDoc(userDocRef, {
            favTracks: arrayRemove(favoriteMusicData),
          });
        } else {
          await updateDoc(userDocRef, {
            favTracks: arrayUnion(favoriteMusicData),
          });
        }

        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          const userIndex = updatedUsers.findIndex((u) => u.uid === user?.uid);
          if (userIndex !== -1) {
            const updatedUserData = {
              ...myData,
              favTracks: isFavoriteSong
                ? myData.favTracks.filter(
                    (favTrack: SongAlt) => favTrack.id !== favoriteMusicData.id,
                  )
                : [...myData.favTracks, favoriteMusicData],
            };
            updatedUsers[userIndex] = updatedUserData;
          }
          return updatedUsers;
        });
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

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
        <div className="i">
          <span className="small-header-white">{i + 1}</span>
        </div>
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
        {isFavoriteSong ? (
          <button className="transparent-btn" onClick={handleAddToFavorites}>
            <FavoriteRoundedIcon sx={{ color: "#dfbf60" }} />
          </button>
        ) : (
          <button className="transparent-btn" onClick={handleAddToFavorites}>
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
