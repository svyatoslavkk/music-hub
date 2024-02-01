import React, { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import ArtistList from "../../components/artistList/ArtistList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import HeaderDesktop from "../../components/headerDesktop/HeaderDesktop";
import HashTags from "../../components/hashTags/HashTags";
import GridBlock from "../../components/gridBlock/GridBlock";
import Popular from "../../components/popular/Popular";

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, users, fetchMusic, allMusic, isExpanded } = useMusicContext();
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const popularHeader = "Popular";
  const artistHeader = "Artists";
  const newestHeader = "Newest";

  const plImage = myData?.avatar;
  const plTitle = myData?.userName;
  const plDesc = myData?.email;

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
        <HeaderDesktop plImage={plImage} plTitle={plTitle} plDesc={plDesc} />
        <PlaylistCards />
        <div className="desktop">
          <HashTags />
          <Popular music={fetchMusic} />
          <GridBlock music={newestMusic} />
        </div>
        <SliderList music={fetchMusic} header={popularHeader} />
        <SliderList music={newestMusic} header={newestHeader} />
        <Player />
      </div>
    </div>
  );
}
