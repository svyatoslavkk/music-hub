import NavBar from "../../components/navBar/NavBar";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";
import ExpandedHeader from "../../components/expandedHeader/ExpandedHeader";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import useWindowSize from "../../components/hooks/useWindowSize";

export default function Profile() {
  const windowSize = useWindowSize();
  const { user, users, isExpanded, welcomePlaylists, allMusic } =
    useMusicContext();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const filteredAllMusic = myData?.favTracks || [];
  const totalTimeTracks: number =
    filteredAllMusic?.reduce((totalTime: number, track: SongAlt) => {
      return totalTime + track.duration;
    }, 0) / 60000 || 0;

  const plImage = (
    <img
      src={myData?.avatar}
      className="mid-circle-img"
      alt={myData?.userName}
    />
  );
  const plTitle = myData?.userName;
  const plDesc = myData?.email;
  const stats = [
    {
      value: myData?.favTracks?.length,
      key: "tracks",
    },
    {
      value: totalTimeTracks.toFixed(0),
      key: "min",
    },
  ];

  const marginBottomStyle =
    windowSize.width > 624
      ? { marginBottom: isExpanded ? 183 : 183 }
      : { marginBottom: isExpanded ? 248 : 130 };

  return (
    <div className="container">
      <NavBar />
      <div className="favorites" style={marginBottomStyle}>
        <div className="expanded-header-wrapper">
          <ExpandedHeader
            plImage={plImage}
            plTitle={plTitle}
            plDesc={plDesc}
            stats={stats}
          />
        </div>
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
        <div className="player-wrapper">
          <Player />
        </div>
      </div>
      <ColorOverlay />
    </div>
  );
}
