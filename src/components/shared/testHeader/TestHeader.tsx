import { ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

interface TestHeaderProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function TestHeader({
  value,
  onChange,
  onClearClick,
}: TestHeaderProps) {
  return (
    <header className="test-header">
      <Link to="/" className="small-blur-circle-btn">
        <GridViewRoundedIcon sx={{ color: "#d0d2d8" }} />
      </Link>
      <div className="explore-input-block">
        <span className="explore-icon">
          <SearchRoundedIcon sx={{ color: "#d0d2d8" }} />
        </span>
        <input
          className="explore-input"
          placeholder="Explore..."
          value={value}
          onChange={onChange}
        />
        {onClearClick ? (
          <button className="clear-icon" onClick={onClearClick}>
            <ClearRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
        ) : null}
      </div>
      <button className="small-blur-circle-btn">
        <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
      </button>
    </header>
  );
}
