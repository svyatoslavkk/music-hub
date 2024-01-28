import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Header() {
  return (
    <header className="header">
      <button className="blur-circle-btn">
        <GridViewRoundedIcon sx={{ color: "#d0d2d8" }} />
      </button>
      <button className="blur-circle-btn">
        <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
      </button>
    </header>
  );
}
