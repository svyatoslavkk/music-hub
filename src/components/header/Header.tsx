import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="blur-circle-btn">
        <GridViewRoundedIcon sx={{ color: "#d0d2d8" }} />
      </Link>
      <button className="blur-circle-btn">
        <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
      </button>
    </header>
  );
}
