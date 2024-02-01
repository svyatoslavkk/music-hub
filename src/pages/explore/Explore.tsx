import { useExploreTracksQuery } from "../../redux/api/api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { doc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useMusicContext } from "../../context/MusicContext";
import NavBar from "../../components/navBar/NavBar";
import Player from "../../components/Player/Player";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { ArtistAlt, SongAlt } from "../../types/types";
import { useSelector } from "react-redux";
import Genres from "../../components/genres/Genres";

export default function Explore() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { allMusic, isExpanded } = useMusicContext();
  const collectionRef = collection(database, "Music Data");
  const musicDocRef = doc(collectionRef, "3GYHK0jYEV5qV4bc5nCG");
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const hashFromQuery = searchParams.get("hash") || "";

  const uniqueArtistsSet = new Set();
  allMusic.forEach((song) => {
    if (song.artists && Array.isArray(song.artists)) {
      song.artists.forEach((artist) => {
        if (artist.profile) {
          uniqueArtistsSet.add(artist.profile.name);
        }
      });
    }
  });
  const uniqueArtistsArray = [...uniqueArtistsSet];

  const {
    data: exploreTracks,
    isFetching: exploreTracksFetching,
    error: exploreTracksError,
  } = useExploreTracksQuery({
    q: debouncedSearchQuery,
    type: "multi",
    offset: "0",
    limit: "5",
    numberOfTopResults: "5",
  });

  const filteredAllMusic = allMusic.filter((song: SongAlt) => {
    const lowerCaseSearchQuery = debouncedSearchQuery.toLowerCase();
    const lowerCaseSongName = song.name.toLowerCase();
    const matchesSongName = lowerCaseSongName.includes(lowerCaseSearchQuery);

    const matchesArtistName = song.artists.some((artist: ArtistAlt) => {
      const lowerCaseArtistName = artist.profile.name.toLowerCase();
      return lowerCaseArtistName.includes(lowerCaseSearchQuery);
    });

    return matchesSongName || matchesArtistName;
  });

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreClick = (genre) => {
    setSearchQuery(genre);
  };

  const handleClearClick = () => {
    setSearchQuery("");
  };

  const handleAddToFavorites = async (song: any) => {
    if (song && song.data && song.data.albumOfTrack) {
      const allMusicData = {
        artists: song.data.artists.items,
        img: song.data.albumOfTrack.coverArt.sources[2].url,
        name: song.data.name,
        id: song.data.id,
        duration: song.data.duration.totalMilliseconds,
      };

      try {
        await updateDoc(musicDocRef, {
          allMusic: arrayUnion(allMusicData),
        });
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    } else {
      console.error("Invalid song object:", song);
    }
  };

  useEffect(() => {
    setSearchQuery(hashFromQuery);
  }, [hashFromQuery]);

  return (
    <div className="container">
      <Header />
      <NavBar />
      <div className="explore" style={{ marginBottom: isExpanded ? 230 : 110 }}>
        <div className="auth-input-section">
          <span className="search-icon">
            <SearchRoundedIcon sx={{ color: "#d0d2d8" }} />
          </span>
          <input
            className="auth-input"
            placeholder="Explore"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className="clear-icon transparent-btn"
            onClick={handleClearClick}
          >
            <ClearRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
        </div>
        {(searchQuery.length < 3 || filteredAllMusic.length === 0) && (
          <Genres
            uniqueArtistsArray={uniqueArtistsArray}
            handleGenreClick={handleGenreClick}
          />
        )}
        <div className="column-content">
          {!isLoading &&
            searchQuery.length >= 3 &&
            filteredAllMusic &&
            filteredAllMusic.map((song: SongAlt, i: number) => (
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

        {/* <div>
          {exploreTracks && exploreTracks?.tracks?.items?.map((hit: any, i: any) => {
            const song = hit?.data;
            return (
              <div
                key={i}
                className="flex-content"
                style={{ backgroundColor: "#ff000099", marginBottom: 16 }}
              >
                <div className="flex-content">
                  <div>
                    <button onClick={() => handleAddToFavorites(hit)}>+</button>
                  </div>
                  <div>
                    {song ? (
                      <>
                        <div className="small-text-white">{song.name}</div>
                        <div>
                          {song.artists.items.map(
                            (artist: any, index: number) => (
                              <div key={index} className="flex-content">
                                <p className="flex-content small-text-white">
                                  {artist.profile.name}
                                  {index !== song.artists.items.length - 1 && (
                                    <>
                                      <span style={{ color: "#ccc" }}>
                                        ,&nbsp;
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </>
                    ) : (
                      <span>Invalid song data</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}

        <Player />
      </div>
      {isLoading && (
        <div className="center-loader">
          <Loader />
        </div>
      )}
    </div>
  );
}
