import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Favorites from "./pages/favorites/Favorites";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
