import { BrowserRouter, Route, Routes } from "react-router-dom";
import DummyLogin from './pages/DummyLogin'
import HomePage from "./pages/HomePage";
import UpdateProfile from "./pages/UpdateProfile";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "./store/AuthContext";

function App() {
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const locTok = localStorage.getItem('token');
    if (locTok) {
      dispatch(loginActions.setToken(locTok));
    }
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {!token && <Route path="/" element={<HomePage />} />}
          {token && <Route path="/login" element={<DummyLogin />} />}
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
