import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useMusicContext } from "../../context/MusicContext";
import TrackListItem from "../../components/trackListItem/TrackListItem";
import { ArtistAlt, SongAlt } from "../../types/types";
import { useSelector } from "react-redux";
import Genres from "../../components/genres/Genres";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import TestHeader from "../../components/shared/testHeader/TestHeader";
import SliderList from "../../components/sliderList/SliderList";
import { RootState } from "../../redux/slices/playerSlice";

export default function Explore() {
  const { allMusic, mightMusic, isExpanded } = useMusicContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
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

  const handleGenreClick = (genre: string) => {
    setSearchQuery(genre);
  };

  const handleClearClick = () => {
    setSearchQuery("");
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

  if (!mightMusic.length) {
    <div className="mid-text-white">Loading...</div>;
  }

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
            {mightMusic.length > 0 && (
              <SliderList music={mightMusic} header={mightHeader} />
            )}
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
          </div>
        </div>
      </div>
      <ColorOverlay />
    </>
  );
}
