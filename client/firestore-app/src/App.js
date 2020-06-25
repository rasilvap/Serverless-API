import React from "react";
import Modal from './modal/modal.js'
import Delete from './components/delete/DeleteRegistersForm.js'
import Configuration from './components/configuration/configuration.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function BasicMenu() {
  return (
    <Router>
      <Modal>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/delete">Delete</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/delete">
            <Dashboard />
          </Route>
        </Switch>
      </div>
      </Modal>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
        <Configuration></Configuration>
    </div>
  );
}

function Dashboard() {
  return (
    <Modal>
      <div>
        <Delete></Delete>
      </div>
    </Modal>
   
  );
}
