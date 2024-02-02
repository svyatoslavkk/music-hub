import { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import Player from "../../components/Player/Player";
import { useMusicContext } from "../../context/MusicContext";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import TestHeader from "../../components/shared/testHeader/TestHeader";

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, users, fetchMusic, allMusic, isExpanded } = useMusicContext();
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const recentMusic = myData?.recentTracks || [];
  const popularHeader = "Popular";
  const newestHeader = "Newest";
  const recentHeader = "Recent Tracks";

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
      parseInt(a?.release_date?.split("-")[2]),
      parseInt(a?.release_date?.split("-")[1]) - 1,
      parseInt(a?.release_date?.split("-")[0]),
    );
    const dateB = new Date(
      parseInt(b?.release_date?.split("-")[2]),
      parseInt(b?.release_date?.split("-")[1]) - 1,
      parseInt(b?.release_date?.split("-")[0]),
    );

    return dateB - dateA;
  });

  const newestMusic = sortedMusic.slice(0, 10);

  return (
    <>
      <div className="container">
        <NavBar />
        <div className="main" style={marginBottomStyle}>
          <div>
            <div className="test-header-wrapper">
              <TestHeader />
            </div>
            <PlaylistCards />
            {/* <div className="desktop">
              <HashTags />
              <Popular music={fetchMusic} />
              <GridBlock music={newestMusic} />
            </div> */}
            <SliderList music={fetchMusic} header={popularHeader} />
            <SliderList music={newestMusic} header={newestHeader} />
            {recentMusic.length >= 4 && (
              <SliderList music={recentMusic} header={recentHeader} />
            )}
          </div>
          <div className="player-wrapper">
            <Player />
          </div>
        </div>
      </div>
      <ColorOverlay />
    </>
  );
}
