import { Switch, Route } from "react-router-dom";
import DummyLogin from './pages/DummyLogin'
import HomePage from "./pages/HomePage";
import { Router } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <DummyLogin />
      </Route>
    </>
  );
}

export default App;
