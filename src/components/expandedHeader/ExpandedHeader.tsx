import { Link } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import TinyLoader from "../loader/TinyLoader";

export default function ExpandedHeader({ plImage, plTitle, plDesc, stats }) {
  return (
    <header className="favorites-header">
      <div className="buttons">
        <Link to="/" className="small-blur-circle-btn">
          <GridViewRoundedIcon sx={{ color: "#d0d2d8" }} />
        </Link>
        <button className="small-blur-circle-btn">
          <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
        </button>
      </div>
      <div className="content">
        {plImage}
        <div>
          <h3 className="mid-header-white">{plTitle}</h3>
          <span className="mid-text-white">{plDesc}</span>
        </div>
      </div>
      <div className="add-content">
        {stats &&
          stats.map((el, i) => (
            <div key={i} className="column-content">
              <h3 className="mid-header-white">{el.value}</h3>
              <span className="mid-text-white">{el.key}</span>
            </div>
          ))}
      </div>
    </header>
  );
}
