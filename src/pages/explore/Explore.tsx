import { useExploreTracksQuery } from "../../redux/api/api";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { doc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useMusicContext } from "../../context/MusicContext";
import Loader from "../../components/loader/Loader";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { ArtistAlt, SongAlt } from "../../types/types";
import { useSelector } from "react-redux";
import Genres from "../../components/genres/Genres";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import TestHeader from "../../components/shared/testHeader/TestHeader";
import SliderList from "../../components/sliderList/SliderList";
import { RootState } from "../../redux/slices/playerSlice";

export default function Explore() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player,
  );
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { user, users, allMusic, isExpanded } = useMusicContext();
  const collectionRef = collection(database, "Music Data");
  const musicDocRef = doc(collectionRef, "3GYHK0jYEV5qV4bc5nCG");
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const hashFromQuery = searchParams.get("hash") || "";

  /////////////////////////////////////////////
  //////////////////////////////////////////////////
  const uniqueArtistsSet = new Set();
  allMusic.forEach((song) => {
    if (song.artists && Array.isArray(song.artists)) {
      song.artists.forEach((artist: ArtistAlt) => {
        if (artist.profile) {
          uniqueArtistsSet.add(artist.profile.name);
        }
      });
    }
  });
  const uniqueArtistsArray = [...uniqueArtistsSet];

  const mightHeader = "You might like it";

  const {
    data: exploreTracks,
    isFetching: exploreTracksFetching,
    error: exploreTracksError,
  } = useExploreTracksQuery({
    q: debouncedSearchQuery,
    type: "multi",
    offset: "0",
    limit: "15",
    numberOfTopResults: "15",
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

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const marginBottomStyle =
    windowWidth > 624
      ? { marginBottom: isExpanded ? 184 : 184 }
      : { marginBottom: isExpanded ? 248 : 130 };

  useEffect(() => {
    setSearchQuery(hashFromQuery);
  }, [hashFromQuery]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const favArtists = myData?.favTracks
    ? Array.from(
        new Set(
          myData?.favTracks.flatMap((track) =>
            track.artists.map((artist: ArtistAlt) => artist.name),
          ),
        ),
      )
    : [];

  const recentArtists = myData?.recentTracks
    ? Array.from(
        new Set(
          myData?.recentTracks.flatMap((track) =>
            track.artists.map((artist: ArtistAlt) => artist.name),
          ),
        ),
      )
    : [];
  const favArtistsSet = new Set(favArtists);
  const recentArtistsSet = new Set(recentArtists);
  const filterByArtists = (musicArray: SongAlt[], artistsSet: string[]) =>
    musicArray.filter((song: SongAlt) =>
      song.artists.some((artist: ArtistAlt) =>
        artistsSet.has(artist.profile.name),
      ),
    );
  const filteredByFavArtists = filterByArtists(allMusic, favArtistsSet);
  const filteredByRecentArtists = filterByArtists(allMusic, recentArtistsSet);
  const filteredMusicByFavRecent = [
    ...filteredByFavArtists,
    ...filteredByRecentArtists,
  ];
  const uniqueRecs = Array.from(
    new Map(filteredMusicByFavRecent.map((song) => [song.id, song])).values(),
  ); // ALL RECOMMENDED SONGS
  const favTracks = myData?.favTracks || [];
  const isNotInFavTracks = (song: SongAlt) =>
    !favTracks.some((favTrack: SongAlt) => favTrack.id === song.id);
  const newRecsNotInFav = uniqueRecs.filter(isNotInFavTracks);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledUniqueRecs = shuffleArray(newRecsNotInFav);
  const mightMusic = shuffledUniqueRecs.slice(0, 10);
  const memoizedMusic = useMemo(() => mightMusic, []);

  return (
    <>
      <div className="container">
        <div className="explore" style={marginBottomStyle}>
          <div className="container-gap">
            <div className="test-header-wrapper">
              <TestHeader
                value={searchQuery}
                onChange={handleInputChange}
                onClearClick={handleClearClick}
              />
            </div>
            {(searchQuery.length < 3 || filteredAllMusic.length === 0) && (
              <Genres
                uniqueArtistsArray={uniqueArtistsArray}
                handleGenreClick={handleGenreClick}
              />
            )}
            <SliderList music={mightMusic} header={mightHeader} />
            <div className="column-content">
              {searchQuery.length >= 3 &&
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
          </div>
        </div>
      </div>
      <ColorOverlay />
    </>
  );
}
