import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PreviewSlider from "../../components/previewSlider/PreviewSlider";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateUsername = () => {
    if (username.length < 6) {
      setUsernameError("Username should be at least 6 characters");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    validateUsername();
    validateEmail();
    validatePassword();
  };

  return (
    <div className="signup">
      <PreviewSlider />
      <div className="signup-content">
        <div className="column-content" style={{ textAlign: "center" }}>
          <h2 className="big-header-dark">Welcome to Music Hub!</h2>
          <p className="mid-text">Let's get started to listen trend music</p>
        </div>
        <form className="auth-form">
          <div className="auth-input-section">
            <span className="username-icon">
              <PersonOutlineOutlinedIcon
                fontSize="small"
                sx={{ color: "#00000099" }}
              />
            </span>
            <input
              type="text"
              className="auth-input"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              onBlur={validateUsername}
            />
          </div>
          {usernameError && <p className="error-message">{usernameError}</p>}
          <div className="auth-input-section">
            <span className="username-icon">
              <EmailOutlinedIcon fontSize="small" sx={{ color: "#00000099" }} />
            </span>
            <input
              type="text"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
            />
          </div>
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="auth-input-section">
            <span className="username-icon">
              <VpnKeyOutlinedIcon
                fontSize="small"
                sx={{ color: "#00000099" }}
              />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            <span
              className="visibility-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <VisibilityOffIcon
                  fontSize="small"
                  sx={{ color: "#00000099" }}
                />
              ) : (
                <VisibilityIcon fontSize="small" sx={{ color: "#00000099" }} />
              )}
            </span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button className="primary-btn" onClick={handleSignUp}>
            <span className="mid-header-white">Sign Up</span>
          </button>
          <button className="secondary-btn">
            <GoogleIcon sx={{ color: "#e4774d" }} />
            <span className="mid-header-gray">Sign Up with Google</span>
          </button>
        </form>
        <div className="column-content">
          <p className="mid-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
