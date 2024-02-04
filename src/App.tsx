import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Favorites from "./pages/favorites/Favorites";
import Playlist from "./pages/playlist/Playlist";
import Profile from "./pages/profile/Profile";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { MusicProvider } from "./context/MusicContext";
import RootLayout from "./_root/RootLayout";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MusicProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route element={<RootLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/:playlistId" element={<Playlist />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </MusicProvider>
      </BrowserRouter>
    </Provider>
  );
}
