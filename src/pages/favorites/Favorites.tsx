import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";

export default function Favorites() {
  const { user, users } = useMusicContext();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const myData = users.filter((data) => data.uid === user?.uid)[0];
  const favList = myData?.favTracks || [];
  console.log("myData", favList);

  return (
    <>
      <Header />
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
    </>
  );
}
