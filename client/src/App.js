import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import GameBoard from "./pages/GameBoard";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import MainLobby from "./pages/MainLobby";

function App() {
  const [credentials, setCredentials] = useState({ username: "", token: "" });

  const token = credentials.token;
  const history = useHistory();

  // const checkLoginStatus = useCallback(() => {
  //   if (!!credentials) {
  //     history.push("/login");
  //   }
  // }, [credentials, history]);

  // useEffect(() => {
  //   checkLoginStatus();
  // });

  return (
    <div className="App">
      <NavBar credentials={credentials} />

      <Switch>
        <Route path="/landing">
          <Landing />
        </Route>

        <Route path="/login">
          <Login credentials={credentials} setCredentials={setCredentials} />
        </Route>

        <Route path="/register">
          <Signup />
        </Route>

        <Route exact path="/">
          <GameBoard credentials={credentials} />
        </Route>

        <Route path="/mainlobby">
          <MainLobby credentials={credentials} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
