import "./App.css";
import React, {
  BrowserRouter as AppRouter,
  Switch,
  Route,
} from "react-router-dom";
import Data from "./Data";
import Post from "./Post";
import Nav from "./Nav";
import Edit from "./Edit";
import Details from "./Details";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <AppRouter>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Data} />
          <Route path="/post"  component={Post} />
          <Route path="/Profile"  component={Profile} />
          <Route path="/edit/:id"  component={Edit} />
          <Route path="/details/:id"  component={Details} />
        </Switch>
      </AppRouter>
    </div>
  );
}

export default App;
