import React, { Component } from "react";
import "./App.css";
import QuizApp from "./QuizApp";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <QuizApp />
      </Router>
    );
  }
}

export default App;
