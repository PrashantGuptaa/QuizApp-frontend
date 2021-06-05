import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Container.css";
import Select from "react-select";
import { quizCategories, correctAnswerOptions } from "../utils/generalData";
import customUseState from "../utils/commonOnchangeHook";
import { Button } from "@material-ui/core";
import { isEmpty, isUserLoggedIn } from "../utils/commonFunctions";
import { APIEndPoints } from "../APIEndpoints/ApiEndPoints";
import axios from 'axios';
import { useHistory } from "react-router";

export default function AddQuiz() {
  let [question, setQuestion, resetQuestion] = customUseState("");
  let [optionA, setOptionA, resetOptionA] = customUseState("");
  let [optionB, setOptionB, resetOptionB] = customUseState("");
  let [optionC, setOptionC, resetOptionC] = customUseState("");
  let [optionD, setOptionD, resetOptionD] = customUseState("");
  let [category, setCategory] = useState(quizCategories[0]);
  let [correctAnswer, setCorrectAnswer] = useState(correctAnswerOptions[0]);

  let [questionErrorText, setQuestionErrorText] = useState("");
  let [optionAErrorText, setOptionAErrorText] = useState("");
  let [optionBErrorText, setOptionBErrorText] = useState("");
  let [optionCErrorText, setOptionCErrorText] = useState("");
  let [optionDErrorText, setOptionDErrorText] = useState("");

  let [questionError, setQuestionError] = useState(false);
  let [optionAError, setoptionAError] = useState(false);
  let [optionBError, setoptionBError] = useState(false);
  let [optionCError, setoptionCError] = useState(false);
  let [optionDError, setoptionDError] = useState(false);
  const history = useHistory();

  let errorMessage = "This Field cannot be empty";

  useEffect(async () => {
    const userInformation = await isUserLoggedIn();
    if(!userInformation || !userInformation.auth || !userInformation.admin) {
      history.push('/');
    }
  }, [])

  const closeErrorAndErrorMessage = () => {
    setQuestionError(false);
    setQuestionErrorText("");
    setoptionAError(false);
    setOptionAErrorText("");
    setoptionBError(false);
    setOptionBErrorText("");
    setoptionCError(false);
    setOptionCErrorText("");
    setoptionDError(false);
    setOptionDErrorText("");
  };

  const checkForEmptyFields = () => {
    let hasErrors = false;
    if (!isEmpty(question)) {
      setQuestionError(true);
      setQuestionErrorText(errorMessage);
      hasErrors = true;
    }
    if (!isEmpty(optionA)) {
      setoptionAError(true);
      setOptionAErrorText(errorMessage);
      hasErrors = true;
    }
    if (!isEmpty(optionB)) {
      setoptionBError(true);
      setOptionBErrorText(errorMessage);
      hasErrors = true;
    }
    if (!isEmpty(optionC)) {
      setoptionCError(true);
      setOptionCErrorText(errorMessage);
      hasErrors = true;
    }
    if (!isEmpty(optionD)) {
      setoptionDError(true);
      setOptionDErrorText(errorMessage);
      hasErrors = true;
    }

    setTimeout(() => closeErrorAndErrorMessage(), 7000);
    return hasErrors;
  };

  const handleSaveQuestion = async () => {
    if(checkForEmptyFields()) return;
    
    const response = await axios.post(APIEndPoints.addQuestion, {
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          category: category.value,
          correctAnswer: correctAnswer.value,
    });
    console.log(response);
  };

  const handleChange = (value, setter) => {
    console.log(setter, value);
    setter(value);
  };
  return (
    <span className="quizForm">
      <h1>Add Questions</h1>
      <TextField
        id="standard-basic"
        label="Question"
        style={{ width: "90%" }}
        error={questionError}
        helperText={questionErrorText}
        {...setQuestion}
      />
      <div className="option">
        <TextField
          id="standard-basic"
          label="Option A"
          className="eachOption"
          error={optionAError}
          helperText={optionAErrorText}
          {...setOptionA}
        />
        <TextField
          id="standard-basic"
          label="Option B"
          className="eachOption"
          {...setOptionB}
          error={optionBError}
          helperText={optionBErrorText}
        />
      </div>
      <div className="option">
        <TextField
          id="standard-basic"
          label="Option C"
          className="eachOption"
          {...setOptionC}
          error={optionCError}
          helperText={optionCErrorText}
        />
        <TextField
          id="standard-basic"
          label="Option D"
          className="eachOption"
          {...setOptionD}
          error={optionDError}
          helperText={optionDErrorText}
        />
      </div>
      <div className="option">
        <Select
          options={quizCategories}
          className="select"
          onChange={(e) => handleChange(e, setCategory)}
          value={category}
        />
        <Select
          options={correctAnswerOptions}
          className="select"
          onChange={(e) => handleChange(e, setCorrectAnswer)}
          value={correctAnswer}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "50px" }}
        onClick={handleSaveQuestion}
      >
        Save Question
      </Button>
    </span>
  );
}
