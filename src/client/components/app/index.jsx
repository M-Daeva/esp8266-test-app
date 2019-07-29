import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../state";
import { Main } from "../connector";

const App = () => {
  return (
    <Provider {...{ store }}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Main} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
