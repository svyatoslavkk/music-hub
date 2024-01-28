import NavBar from "../../components/navBar/NavBar";
import MiniPlayer from "../../components/miniPlayer/MiniPlayer";
import Header from "../../components/header/Header";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Explore() {
  return (
    <>
      <Header />
      <div className="explore">
        <div className="auth-input-section">
          <span className="search-icon">
            <SearchRoundedIcon sx={{ color: "#d0d2d8" }} />
          </span>
          <input className="auth-input" placeholder="Explore" />
        </div>
        <MiniPlayer />
        <NavBar />
      </div>
    </>
  );
}
