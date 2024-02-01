import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

interface HeaderDesktopProps {
  plImage: string;
  plTitle: string;
  plDesc: string;
}

export default function HeaderDesktop({
  plImage,
  plTitle,
  plDesc,
}: HeaderDesktopProps) {
  return (
    <header className="header-desktop">
      <div className="auth-input-section">
        <span className="search-icon">
          <SearchRoundedIcon sx={{ color: "#d0d2d8" }} />
        </span>
        <input className="auth-input" placeholder="Explore" />
        <button className="clear-icon transparent-btn">
          <ClearRoundedIcon sx={{ color: "#d0d2d8" }} />
        </button>
      </div>
      <div className="mini-profile flex-content">
        <img src={plImage} className="small-circle-img" alt={plTitle} />
        <div>
          <h3 className="small-header-white">{plTitle}</h3>
          <span className="small-text-white">{plDesc}</span>
        </div>
      </div>
    </header>
  );
}
