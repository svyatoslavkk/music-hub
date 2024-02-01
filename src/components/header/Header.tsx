import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="small-blur-circle-btn">
          <GridViewRoundedIcon fontSize="medium" sx={{ color: "#d0d2d8" }} />
        </Link>
        <div className="explore-input-block">
          <span className="explore-icon">
            <SearchRoundedIcon fontSize="medium" sx={{ color: "#d0d2d8" }} />
          </span>
          <input className="explore-input" placeholder="Explore..." />
        </div>
        <button className="small-blur-circle-btn">
          <LogoutRoundedIcon fontSize="medium" sx={{ color: "#d0d2d8" }} />
        </button>
      </header>
    </>
  );
}
