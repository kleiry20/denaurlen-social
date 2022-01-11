import "./App.css";

// import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Credentials from "./components/credentials";
import Validation from "./components/valuation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Credentials />
          </Route>
          <Route path="/validation">
            <Validation />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
