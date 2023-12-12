import { Route } from "react-router-dom";
import DummyLogin from './pages/DummyLogin'
import HomePage from "./pages/HomePage";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <DummyLogin />
      </Route>
      <Route path='/updateProfile'>
        <UpdateProfile />
      </Route>
    </>
  );
}

export default App;
