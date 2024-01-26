import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import SignUp from "./pages/signUp/SignUp";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
