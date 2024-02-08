import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  const navEls = [
    {
      icon: (
        <GridViewRoundedIcon
          fontSize="medium"
          sx={{ color: location.pathname === "/" ? "#190b14" : "#d0d2d8" }}
        />
      ),
      name: "Menu",
      link: "/",
    },
    {
      icon: (
        <ExploreRoundedIcon
          fontSize="medium"
          sx={{
            color: location.pathname === "/explore" ? "#190b14" : "#d0d2d8",
          }}
        />
      ),
      name: "Explore",
      link: "/explore",
    },
    {
      icon: (
        <FavoriteRoundedIcon
          fontSize="medium"
          sx={{
            color: location.pathname === "/favorites" ? "#190b14" : "#d0d2d8",
          }}
        />
      ),
      name: "Favorites",
      link: "/favorites",
    },
    {
      icon: (
        <PersonRoundedIcon
          fontSize="medium"
          sx={{
            color: location.pathname === "/profile" ? "#190b14" : "#d0d2d8",
          }}
        />
      ),
      name: "Profile",
      link: "/profile",
    },
  ];

  return (
    <nav className="nav-bar">
      <div className="upper">
        <h1 className="logo" style={{ color: "#d0d2d8" }}>
          MUSIC HUB
        </h1>
        {navEls.map((el) => (
          <Link
            key={el.name}
            to={el.link}
            className={`blur-circle-btn flex-content ${location.pathname === el.link ? "active-icon" : ""}`}
          >
            {el.icon}
            <span
              className={`name small-header-white`}
              style={{
                color: location.pathname === el.link ? "#190b14" : "#d0d2d8",
              }}
            >
              {el.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="lower">
        <button className="blur-circle-btn flex-content" onClick={handleLogout}>
          <LogoutRoundedIcon sx={{ color: "#d0d2d8" }} />
          <span className={`name small-header-white`}>Logout</span>
        </button>
      </div>
    </nav>
  );
}
