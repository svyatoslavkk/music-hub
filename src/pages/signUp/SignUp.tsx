import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { app, database } from "../../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../../components/loader/Loader";
import ColorOverlay from "../../components/colorOverlay/ColorOverlay";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneIcon from "@mui/icons-material/Done";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const collectionRef = collection(database, "Users Data");

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    validateUsername();
    validateEmail();
    validatePassword();
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = auth.currentUser;

      if (currentUser) {
        let pictureUrl = null;

        if (avatar) {
          const storage = getStorage(app);
          const storageRef = ref(
            storage,
            "avatars/" + currentUser?.uid + ".jpg",
          );
          await uploadBytes(storageRef, avatar);
          pictureUrl = await getDownloadURL(storageRef);
        }

        await updateProfile(currentUser, {
          displayName: username,
          photoURL: pictureUrl,
        });

        console.log(response.user);
        const idToken = await currentUser.getIdToken();
        sessionStorage.setItem("Token", idToken);

        const docRef = await addDoc(collectionRef, {
          uid: currentUser.uid,
          userName: username,
          email: currentUser.email,
          favTracks: [],
          recentTracks: [],
          listenedTimes: [],
          listeningStats: {},
          ...(avatar && { avatar: pictureUrl }),
        });

        const docId = docRef.id;

        await updateDoc(doc(collectionRef, docId), {
          docId: docId,
        });

        navigate("/");
      }
    } catch (err: any) {
      console.error("Registration error:", err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup">
        <div className="signup-content">
          <div className="column-content" style={{ textAlign: "center" }}>
            <h2 className="big-header-white">Welcome to Music Hub!</h2>
            <p className="mid-text-white">
              Let's get started to listen trend music
            </p>
          </div>
          <form className="auth-form">
            <div className="auth-input-section">
              <span className="username-icon">
                <AddPhotoAlternateIcon
                  fontSize="inherit"
                  sx={{ color: "#E0E0E0" }}
                />
              </span>
              <input
                type="file"
                className="auth-input"
                id="avatarInput"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="auth-input-section">
              <span className="username-icon">
                <PersonOutlineOutlinedIcon
                  fontSize="inherit"
                  sx={{ color: "#E0E0E0" }}
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
              {usernameError ? (
                <span className="alert-icon">
                  <PriorityHighIcon
                    fontSize="inherit"
                    sx={{ color: "#304030" }}
                  />
                </span>
              ) : (
                <span className="done-icon">
                  <DoneIcon fontSize="inherit" sx={{ color: "#304030" }} />
                </span>
              )}
            </div>
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
                onBlur={validateEmail}
              />
              {emailError ? (
                <span className="alert-icon">
                  <PriorityHighIcon
                    fontSize="inherit"
                    sx={{ color: "#304030" }}
                  />
                </span>
              ) : (
                <span className="done-icon">
                  <DoneIcon fontSize="inherit" sx={{ color: "#304030" }} />
                </span>
              )}
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
                onBlur={validatePassword}
              />
              <span
                className="visibility-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityOffIcon
                    fontSize="inherit"
                    sx={{ color: "#E0E0E0" }}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="inherit"
                    sx={{ color: "#E0E0E0" }}
                  />
                )}
                {passwordError ? (
                  <span className="alert-icon-password">
                    <PriorityHighIcon
                      fontSize="inherit"
                      sx={{ color: "#304030" }}
                    />
                  </span>
                ) : (
                  <span className="done-icon-password">
                    <DoneIcon fontSize="inherit" sx={{ color: "#304030" }} />
                  </span>
                )}
              </span>
            </div>
            <button className="primary-btn" onClick={handleSignUp}>
              <span className="mid-header-dark">Sign Up</span>
            </button>
            <div className="line-block">
              <div className="line"></div>
              <span className="mid-header-white">or</span>
              <div className="line"></div>
            </div>
            <button className="secondary-btn">
              <GoogleIcon fontSize="small" sx={{ color: "#e4774d" }} />
              <span className="mid-header-white">Sign Up with Google</span>
            </button>
          </form>
          <div className="column-content">
            <p className="mid-text-white">
              Already have an account?{" "}
              <Link
                to="/login"
                className="mid-text-white"
                style={{ color: "#dfbf60", textDecoration: "none" }}
              >
                Log in
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
