import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ExpandedHeader from "../../components/expandedHeader/ExpandedHeader";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";

export default function Favorites() {
  const { user, users, isExpanded } = useMusicContext();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const myData = users.filter((data) => data.uid === user?.uid)[0];
  const filteredAllMusic = myData?.favTracks || [];
  const totalTimeTracks: number =
    filteredAllMusic?.reduce((totalTime: number, track: SongAlt) => {
      return totalTime + track.duration;
    }, 0) / 60000 || 0;

  const plImage = (
    <div className="mid-circle-img">
      <FavoriteRoundedIcon fontSize="large" sx={{ color: "#190b14" }} />
    </div>
  );
  const plTitle = "Favorite tracks";
  const plDesc = "Playlist";
  const stats = [
    {
      value: filteredAllMusic?.length,
      key: "tracks",
    },
    {
      value: totalTimeTracks.toFixed(0),
      key: "min",
    },
  ];

  return (
    <>
      <ExpandedHeader
        plImage={plImage}
        plTitle={plTitle}
        plDesc={plDesc}
        stats={stats}
      />
      <div
        className="favorites"
        style={{ marginBottom: isExpanded ? 230 : 110 }}
      >
        {filteredAllMusic && filteredAllMusic.length > 0 && (
          <div className="column-content">
            {filteredAllMusic.map((song: SongAlt, i: number) => (
              <TrackListItem
                key={song.id}
                song={song}
                filteredAllMusic={filteredAllMusic}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        )}
        <Player />
        <NavBar />
      </div>
      <ColorOverlay />
    </>
  );
}
