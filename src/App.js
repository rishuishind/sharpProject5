import { BrowserRouter, Route, Routes } from "react-router-dom";
import DummyLogin from './pages/DummyLogin'
import HomePage from "./pages/HomePage";
import UpdateProfile from "./pages/UpdateProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<DummyLogin />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
