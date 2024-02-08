import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user);
        user
          .getIdToken()
          .then((accessToken) => {
            sessionStorage.setItem("Token", accessToken);
            navigate("/");
          })
          .catch((error) => {
            console.error("getIdToken error", error);
          });
      })
      .catch((error) => {
        console.error("signIn error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      const accessToken = await user.getIdToken();
      sessionStorage.setItem("Token", accessToken);
      navigate("/");
    } catch (error) {
      console.error("Google Sign In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup">
        <div className="signup-content">
          <div className="column-content" style={{ textAlign: "center" }}>
            <h2 className="big-header-white">Welcome back to Music Hub!</h2>
            <p className="mid-text-white">
              Let's continue to listen your favorite music
            </p>
          </div>
          <form className="auth-form">
            <div className="auth-input-section">
              <span className="username-icon">
                <EmailOutlinedIcon
                  fontSize="inherit"
                  sx={{ color: "#E0E0E0" }}
                />
              </span>
              <input
                type="text"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="auth-input-section">
              <span className="username-icon">
                <VpnKeyOutlinedIcon
                  fontSize="inherit"
                  sx={{ color: "#E0E0E0" }}
                />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="visibility-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    sx={{ color: "#E0E0E0" }}
                  />
                ) : (
                  <VisibilityIcon fontSize="small" sx={{ color: "#E0E0E0" }} />
                )}
              </button>
            </div>
            <button className="primary-btn" onClick={signIn}>
              <span className="mid-header-dark">Log In</span>
            </button>
            <div className="line-block">
              <div className="line"></div>
              <span className="mid-header-white">or</span>
              <div className="line"></div>
            </div>
            <button className="secondary-btn" onClick={signInWithGoogle}>
              <GoogleIcon fontSize="small" sx={{ color: "#e4774d" }} />
              <span className="mid-header-white">Log In with Google</span>
            </button>
          </form>
          <div className="column-content">
            <p className="mid-text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="mid-text-white"
                style={{ color: "#dfbf60", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {loading && (
        <div className="overlay">
          <Loader />
        </div>
      )}
      <ColorOverlay />
    </>
  );
}
