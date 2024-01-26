import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
