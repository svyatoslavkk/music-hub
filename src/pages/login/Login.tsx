import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import PreviewSlider from "../../components/previewSlider/PreviewSlider";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="signup">
      <PreviewSlider />
      <div className="signup-content">
        <div className="column-content" style={{ textAlign: "center" }}>
          <h2>Welcome back to Music Hub!</h2>
          <p className="mid-text-gray">
            Let's continue to listen your favorite music
          </p>
        </div>
        <form className="auth-form">
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
            <span className="mid-text-white">Log In</span>
          </button>
          <button className="secondary-btn">
            <GoogleIcon sx={{ color: "#e4774d" }} />
            <span className="mid-text-gray">Log In with Google</span>
          </button>
        </form>
        <div className="column-content">
          <p className="mid-text-gray">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
