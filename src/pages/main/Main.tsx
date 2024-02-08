import { useEffect, useState } from "react";
import SliderList from "../../components/sliderList/SliderList";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import { useMusicContext } from "../../context/MusicContext";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import TestHeader from "../../components/shared/testHeader/TestHeader";

export default function Main() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user, users, fetchMusic, newestMusic, isExpanded } =
    useMusicContext();
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

  return (
    <>
      <div className="container">
        <div className="main" style={marginBottomStyle}>
          <div className="container-gap">
            <div className="test-header-wrapper">
              <TestHeader />
            </div>
            <PlaylistCards />
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
