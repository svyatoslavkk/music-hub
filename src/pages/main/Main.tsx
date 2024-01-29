import Genres from "../../components/genres/Genres";
import SliderList from "../../components/sliderList/SliderList";
import ArtistList from "../../components/artistList/ArtistList";
import NavBar from "../../components/navBar/NavBar";
import PlaylistCards from "../../components/playlistCards/PlaylistCards";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";

export default function Main() {
  const popularHeader = "Popular";
  const artistHeader = "Artists";

  return (
    <>
      <Header />
      <div className="main">
        <PlaylistCards />
        <Genres />
        <SliderList header={popularHeader} />
        <ArtistList header={artistHeader} />
        <Player />
        <NavBar />
      </div>
    </>
  );
}
