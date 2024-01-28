import Genres from "../../components/genres/Genres";
import SliderList from "../../components/sliderList/SliderList";
import ArtistList from "../../components/artistList/ArtistList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";

export default function Main() {
  const popularHeader = "Popular";
  const artistHeader = "Artists";

  return (
    <>
      <div className="main">
        <PlaylistCards />
        <SliderList header={popularHeader} />
        <ArtistList header={artistHeader} />
        <NavBar />
      </div>
    </>
  );
}
