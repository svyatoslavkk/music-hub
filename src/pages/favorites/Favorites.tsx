import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import MiniPlayer from "../../components/miniPlayer/MiniPlayer";

export default function Favorites() {
  return (
    <>
      <Header />
      <div className="favorites">
        <h2>Favorites</h2>
        <MiniPlayer />
        <NavBar />
      </div>
    </>
  );
}
