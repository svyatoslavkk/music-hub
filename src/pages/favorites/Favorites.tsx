import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ExpandedHeader from "../../components/expandedHeader/ExpandedHeader";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import { RootState } from "../../redux/slices/playerSlice";
import useWindowSize from "../../hooks/useWindowSize";

export default function Favorites() {
  const windowSize = useWindowSize();
  const { user, users, isExpanded } = useMusicContext();
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player,
  );
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

  const marginBottomStyle =
    windowSize.width > 624
      ? { marginBottom: isExpanded ? 183 : 183 }
      : { marginBottom: isExpanded ? 248 : 130 };

  return (
    <div className="container">
      <div className="favorites" style={marginBottomStyle}>
        <div>
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
        </div>
      </div>
      <ColorOverlay />
    </div>
  );
}
