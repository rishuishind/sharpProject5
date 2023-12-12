// import { Switch, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import { Router } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication";

function App() {
  return (
    <>
      <Navbar />
      <Authentication />
    </>
  );
}

export default App;
