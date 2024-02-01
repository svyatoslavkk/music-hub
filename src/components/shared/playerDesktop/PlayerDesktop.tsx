import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

export default function PlayerDesktop() {
  const fake =
    "https://i.scdn.co/image/ab67616100005174f2db81b3312a1f167fc54096";
  return (
    <div className="player-desktop">
      <img src={fake} className="image" alt="" />
      <div className="controller">
        <div>
          <span className="mid-text-white">Trippie Redd</span>
          <h3 className="big-header-white">The Grinch</h3>
        </div>
        <div className="buttons">
          <button className="transparent-btn">
            <FavoriteBorderRoundedIcon sx={{ color: "#d0d2d8" }} />
          </button>
          <div className="play-pause">
            <button className="blur-circle-btn">
              <SkipPreviousRoundedIcon sx={{ color: "#d0d2d8" }} />
            </button>
            <button className="blur-circle-btn">
              <PlayArrowRoundedIcon
                sx={{ color: "#d0d2d8" }}
                fontSize="medium"
              />
            </button>
            <button className="blur-circle-btn">
              <SkipNextRoundedIcon sx={{ color: "#d0d2d8" }} />
            </button>
          </div>
          <button className="transparent-btn">
            <LoopRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
          </button>
        </div>
        <label className="line-bar">
          <span className="small-text-white">0:00</span>
          <input type="range" className="input-range" />
          <span className="small-text-white">0:00</span>
        </label>
      </div>
      <div className="volume">
        <button className="volume-btn">
          <VolumeUpRoundedIcon sx={{ color: "#d0d2d8" }} fontSize="medium" />
        </button>
        <label className="volume-trigger">
          <input type="range" className="volume-range" />
        </label>
      </div>
    </div>
  );
}
