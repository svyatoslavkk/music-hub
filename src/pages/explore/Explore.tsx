import NavBar from "../../components/navBar/NavBar";
import MiniPlayer from "../../components/miniPlayer/MiniPlayer";
import Header from "../../components/header/Header";

export default function Explore() {
  return (
    <>
      <Header />
      <div className="explore">
        <h2>Explore</h2>
        <MiniPlayer />
        <NavBar />
      </div>
    </>
  );
}
