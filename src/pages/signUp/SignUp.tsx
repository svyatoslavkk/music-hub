import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import PreviewSlider from "../../components/previewSlider/PreviewSlider";

export default function SignUp() {
  return (
    <div className="signup">
      <PreviewSlider />
      <div className="signup-content">
        <div className="column-content">
          <h2>Welcome to Music Hub!</h2>
          <p className="mid-text-gray">
            Let's get started to listen trend music
          </p>
        </div>
        <form className="auth-form">
          <div className="auth-input-section">
            <span className="username-icon">
              <PersonOutlineOutlinedIcon
                fontSize="small"
                sx={{ color: "#00000099" }}
              />
            </span>
            <input type="text" className="auth-input" placeholder="Username" />
          </div>
          <div className="auth-input-section">
            <span className="username-icon">
              <EmailOutlinedIcon fontSize="small" sx={{ color: "#00000099" }} />
            </span>
            <input type="text" className="auth-input" placeholder="Email" />
          </div>
          <div className="auth-input-section">
            <span className="username-icon">
              <VpnKeyOutlinedIcon
                fontSize="small"
                sx={{ color: "#00000099" }}
              />
            </span>
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
            />
          </div>
          <button className="primary-btn">
            <span className="mid-text-white">Sign Up</span>
          </button>
          <button className="secondary-btn">
            <GoogleIcon sx={{ color: "#e4774d" }} />
            <span className="mid-text-gray">Sign Up with Google</span>
          </button>
        </form>
        <div className="column-content">
          <p className="mid-text-gray">
            Already have an account? <span>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
