import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import HeaderDesktop from "../../components/headerDesktop/HeaderDesktop";
import HashTags from "../../components/hashTags/HashTags";
import GridBlock from "../../components/gridBlock/GridBlock";
import Popular from "../../components/popular/Popular";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PlayerDesktop from "../../components/shared/playerDesktop/PlayerDesktop";
import TestHeader from "../../components/shared/testHeader/TestHeader";

export default function Test() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, users, fetchMusic, allMusic, isExpanded } = useMusicContext();
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const popularHeader = "Popular";
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
      ? { marginBottom: isExpanded ? 184 : 184 }
      : { marginBottom: isExpanded ? 248 : 130 };

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
    <>
      <div className="container">
        <NavBar />
        <div className="main" style={marginBottomStyle}>
          <Header />
          <TestHeader />
          <PlaylistCards />
          {/* <div className="desktop">
            <HashTags />
            <Popular music={fetchMusic} />
            <GridBlock music={newestMusic} />
          </div> */}
          <SliderList music={fetchMusic} header={popularHeader} />
          <SliderList music={newestMusic} header={newestHeader} />
          <div className="player-wrapper">
            <Player />
          </div>
        </div>
      </div>
      <ColorOverlay />
    </>
  );
}
