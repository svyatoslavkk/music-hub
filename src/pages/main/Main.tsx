import React, { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import ArtistList from "../../components/artistList/ArtistList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { fetchMusic, allMusic, isExpanded } = useMusicContext();
  const popularHeader = "Popular";
  const artistHeader = "Artists";
  const newestHeader = "Newest";

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const marginBottomStyle =
    windowWidth > 624
      ? { marginBottom: isExpanded ? 165 : 45 }
      : { marginBottom: isExpanded ? 230 : 110 };

  const sortedMusic = allMusic.sort((a, b) => {
    const dateA = new Date(
      parseInt(a.release_date.split("-")[2]),
      parseInt(a.release_date.split("-")[1]) - 1,
      parseInt(a.release_date.split("-")[0]),
    );
    const dateB = new Date(
      parseInt(b.release_date.split("-")[2]),
      parseInt(b.release_date.split("-")[1]) - 1,
      parseInt(b.release_date.split("-")[0]),
    );

    return dateB - dateA;
  });

  const newestMusic = sortedMusic.slice(0, 10);

  return (
    <div className="container">
      <Header />
      <NavBar />
      <div className="main" style={marginBottomStyle}>
        <PlaylistCards />
        <SliderList music={fetchMusic} header={popularHeader} />
        <SliderList music={newestMusic} header={newestHeader} />
        <Player />
      </div>
    </div>
  );
}
