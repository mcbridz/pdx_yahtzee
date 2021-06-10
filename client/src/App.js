import "./App.css";
import React, { useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import GameBoard from "./pages/GameBoard";

function App() {
  // const [credentials, setCredentials] = useState({ username: "", token: "" });

  // const token = credentials.token

  // const checkLoginStatus = useCallback(() => {
  //   if (!!credentials) {
  //     history.push("/login");
  //   }
  // }, [credentials, history]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <GameBoard /> 
        </Route>
        <Route path="/login">
          {/* <Login setCredentials={setCredentials} /> */}
        </Route>
        <Route path="/register">
          {/* <Register /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
