import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Player from "../../components/Player/Player";

export default function Favorites() {
  return (
    <>
      <Header />
      <div className="favorites">
        <h2>Favorites</h2>
        <Player />
        <NavBar />
      </div>
    </>
  );
}
