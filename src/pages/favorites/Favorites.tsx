import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Favorites() {
  const { user, users } = useMusicContext();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const myData = users.filter((data) => data.uid === user?.uid)[0];
  const favList = myData?.favTracks || [];
  const totalTimeTracks =
    favList.reduce((totalTime, track) => {
      return totalTime + track.duration;
    }, 0) / 60000;
  const fake =
    "https://png.pngtree.com/thumb_back/fh260/background/20230929/pngtree-group-of-shiny-red-and-blue-hearts-are-on-a-blue-image_13507809.png";

  return (
    <>
      <div className="favorites-header">
        <header className="buttons">
          <button className="blur-circle-btn">
            <GridViewRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
          <button className="blur-circle-btn">
            <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
        </header>
        <div className="content">
          <img src={fake} className="mid-circle-img" />
          <div>
            <h3 className="mid-header-white">Favorite tracks</h3>
            <span className="mid-text-white">Playlist</span>
          </div>
        </div>
        <div className="add-content">
          <div className="column-content">
            <h3 className="mid-header-white">{favList.length}</h3>
            <span className="mid-text-white">tracks</span>
          </div>
          <div className="column-content">
            <h3 className="mid-header-white">{totalTimeTracks.toFixed(0)}</h3>
            <span className="mid-text-white">min</span>
          </div>
        </div>
      </div>
      <div className="favorites">
        <div className="column-content">
          {favList &&
            favList.map((song: SongAlt, i: number) => (
              <TrackListItem
                key={song.id}
                song={song}
                filteredAllMusic={favList}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
        </div>
        <Player />
        <NavBar />
      </div>
      <div className="bottom-overlay"></div>
    </>
  );
}
