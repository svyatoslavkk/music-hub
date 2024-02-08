import { useState, useEffect } from "react";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { useSelector } from "react-redux";
import { SongAlt, User } from "../../types/types";
import ExpandedHeader from "../../components/expandedHeader/ExpandedHeader";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import useWindowSize from "../../hooks/useWindowSize";
import { RootState } from "../../redux/slices/playerSlice";
import Chart from "../../components/chart/Chart";
import ChartAdaptive from "../../components/chartAdaptive/ChartAdaptive";
import Loader from "../../components/loader/Loader";

export default function Profile() {
  const windowSize = useWindowSize();
  const { user, users, isExpanded, allMusic } = useMusicContext();
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player,
  );
  const myData =
    users.length > 0
      ? users.filter((data: User) => data.uid === user?.uid)[0]
      : null;
  const allSongs = allMusic || [];
  const filteredAllMusic = myData?.favTracks || [];
  const frequentMusic = myData?.listenedTimes || [];
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  //////////////////////////////////////////////
  const songNames = frequentMusic.map((song: SongAlt) => song.id);
  const songCounter = new Map<string, number>();
  songNames.forEach((song: any) => {
    songCounter.set(song, (songCounter.get(song) || 0) + 1);
  });
  const sortedSongs = Array.from(songCounter.entries()).sort(
    (a, b) => b[1] - a[1],
  );
  const topFiveSongs = sortedSongs.slice(0, 5);

  const topFiveSongsDetails = topFiveSongs.map(([songId, count]) => {
    const songDetails = allSongs.find((song) => song.id === songId);
    return songDetails ? { ...songDetails, count } : null;
  });

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
  const plTitle = myData?.userName || "";
  const plDesc = myData?.email || "";
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

  useEffect(() => {
    if (myData) {
      setUserDataLoaded(true);
    }
  }, [myData]);

  if (!userDataLoaded) {
    return (
      <div className="profile-overlay">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }

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
          {topFiveSongsDetails.length >= 5 && (
            <Chart topFiveSongsDetails={topFiveSongsDetails} />
          )}
          {topFiveSongsDetails.length < 5 && <ChartAdaptive />}
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
