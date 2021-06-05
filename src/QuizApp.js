import React, { Component } from "react";
import SignIn from "./Auth/login";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./Auth/signup";
import Home from "./Containers/Home";
import AddQuiz from "./Containers/addQuiz";
import QuestionHome from "./Containers/QuestionHome";

class QuizApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/addquiz" component={AddQuiz} />
        <Route exact path="/quiz" component={QuestionHome} />
        <Redirect to='/login' />
      </Switch>
    );
  }
}

export default QuizApp;
