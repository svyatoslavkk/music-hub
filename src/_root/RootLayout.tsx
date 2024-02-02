import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Player from "../components/Player/Player";

export default function RootLayout() {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
      <div className="player-wrapper">
        <Player />
      </div>
    </div>
  );
}
