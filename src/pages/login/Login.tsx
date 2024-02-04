import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const signIn = async (event: any) => {
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup">
        <div className="signup-content">
          <div className="column-content" style={{ textAlign: "center" }}>
            <h2 className="big-header-dark">Welcome back to Music Hub!</h2>
            <p className="mid-text">
              Let's continue to listen your favorite music
            </p>
          </div>
          <form className="auth-form">
            <div className="auth-input-section">
              <span className="username-icon">
                <EmailOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#00000099" }}
                />
              </span>
              <input
                type="text"
                className="auth-input"
                placeholder="Email"
                onChange={handleEmailChange}
              />
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
                onChange={handlePasswordChange}
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
                  <VisibilityIcon
                    fontSize="small"
                    sx={{ color: "#00000099" }}
                  />
                )}
              </span>
            </div>
            <button className="primary-btn" onClick={signIn}>
              <span className="mid-header-white">Log In</span>
            </button>
            <button className="secondary-btn">
              <GoogleIcon sx={{ color: "#e4774d" }} />
              <span className="mid-header-gray">Log In with Google</span>
            </button>
          </form>
          <div className="column-content">
            <p className="mid-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      {loading && (
        <div className="overlay">
          <Loader />
        </div>
      )}
    </>
  );
}
