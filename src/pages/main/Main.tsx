import { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import { useMusicContext } from "../../context/MusicContext";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import TestHeader from "../../components/shared/testHeader/TestHeader";
import { useSpring, animated, useChain } from "react-spring";

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, users, allMusic, fetchMusic, isExpanded } = useMusicContext();
  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const recentMusic = myData?.recentTracks || [];
  const uniqueRecentMusic = recentMusic.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (item) => item.id === value.id && item.soundFile === value.soundFile,
      ),
  );

  const popularHeader = "Popular";
  const newestHeader = "Newest";
  const recentHeader = "Recently Listened";

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
        <div className="main" style={marginBottomStyle}>
          <div className="container-gap">
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
            {uniqueRecentMusic.length >= 4 && (
              <SliderList music={uniqueRecentMusic} header={recentHeader} />
            )}
          </div>
        </div>
      </div>
      <ColorOverlay />
    </>
  );
}
