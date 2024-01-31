import NavBar from "../../components/navBar/NavBar";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt } from "../../types/types";
import { useParams } from "react-router-dom";
import ExpandedHeader from "../../components/expandedHeader/ExpandedHeader";

export default function Playlist() {
  const { playlistId } = useParams();
  const { isExpanded, welcomePlaylists, allMusic } = useMusicContext();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const chosenPl = welcomePlaylists?.filter((el) => el.id === playlistId)[0];

  const filteredAllMusic = allMusic.filter(
    (song: SongAlt) => song.playlist === chosenPl?.name,
  );

  const totalTimeTracks: number =
    filteredAllMusic?.reduce((totalTime: number, track: SongAlt) => {
      return totalTime + track.duration;
    }, 0) / 60000 || 0;

  const plImage = (
    <img
      src={chosenPl?.image}
      className="mid-circle-img"
      alt={chosenPl?.name}
    />
  );
  const plTitle = chosenPl?.name;
  const plDesc = chosenPl?.description;
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

  console.log("welcomePlaylists", welcomePlaylists);

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
    </>
  );
}
