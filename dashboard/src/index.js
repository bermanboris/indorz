import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Register } from "./register";
import { Login } from "./login";
import { AuthProvider, AuthContext } from "./auth";

function AuthenticatedRoute({ component: Component, ...props }) {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return <Component {...props} />;
  }
}

function NotAuthenticatedRoute({ component: Component, ...props }) {
  const { state } = useContext(AuthContext);

  if (state.isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  } else {
    return <Component {...props} />;
  }
}

ReactDOM.render(
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/register">
          <NotAuthenticatedRoute component={Register} />
        </Route>
        <Route path="/login">
          <NotAuthenticatedRoute component={Login} />
        </Route>
        <Route path="/">
          <AuthenticatedRoute component={App} />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
