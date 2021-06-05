import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Modal from "./Components/Modal";
import { quizInstructions } from "../utils/generalData";
import Question from "./Components/Question";
import { isUserLoggedIn } from "../utils/commonFunctions";
import { Button } from "@material-ui/core";

const QuestionHome = () => {
  let [showInstructionModal, setShowInstructionModal] = useState(true);
  let [questionNum, setQuestionNum] = useState(1);
  let [questionList, setQuestionList] = useState([]);
  let [answer, setAnswer] = useState([]);
  let [result, setResult] = useState('');
  let [showAdditionalButtons, setShowAddtionalButtons] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    const userInformation = await isUserLoggedIn();
   if(!userInformation || !userInformation.auth) {
     history.push('/login');
     return;
   }
   const { questionList } = history.location.state;
   if(!questionList.length) {
     handleEmptyList();
     return;
   }
    setQuestionList(history.location.state.questionList);
  }, []);

  const handleEmptyList = () => {
    const ques = {
      _id: 1234,
      question: "This Quiz Does not have enough Question. Please try Some different Quiz.",
      optionA: '...',
      optionB: '...',
      optionC: '...',
      optionD: '...',
      correctAnswer: '...',
    }
    setQuestionList([ques]);
  }

  const handleInstructionModalChange = (value) => {
    setShowInstructionModal(value);
  };

  const handleQuestionChange = (operation, value) => {
    let answerCopy = [...answer];
    answerCopy[questionNum - 1] = value;
    setAnswer(answerCopy);

    if (questionNum >= questionList.length && operation === 'increment') {
      console.log("F-3 Greater than 10")
      setQuestionNum(1);
    } else if (questionNum <= 1 && operation === 'decrement') {
      setQuestionNum(10);
    } else if (operation === "increment") {
      setQuestionNum(questionNum + 1);
    } else if (operation === "decrement") {
      setQuestionNum(questionNum - 1);
    } else {
      // doo nothing
      console.log("No Change");
    }
  };

  const giveResults = () => {
    let score = 0;
    for(let i = 0 ; i < answer.length ; i++) {
      if(answer[i] === questionList[i].correctAnswer) {
        score++;
      }
    }
    setResult(`Congratulations! You've scored ${score}/10`);
    setShowAddtionalButtons(true);
  }

  const goBackToHomePage = () => {
    history.push('/');
  }

  const tryAgain = () =>  {
    setAnswer([]);
    setResult('');
    setShowAddtionalButtons(false)
  }

  const getQuestion = () => {
    return questionList.length > 0 ? (
      <Question
        key={questionList[questionNum - 1]._id}
        question={questionList[questionNum - 1].question}
        option1={questionList[questionNum - 1].optionA}
        option2={questionList[questionNum - 1].optionB}
        option3={questionList[questionNum - 1].optionC}
        option4={questionList[questionNum - 1].optionD}
        correctAnswer={questionList[questionNum - 1].correctAnswer}
        handleQuestionChange={handleQuestionChange}
        questionNum={questionNum}
        answer={answer[questionNum - 1]}
        handleSubmission={giveResults}
      />
    ) : null;
  };

  const getaddtionalButtons = () => {
    return showAdditionalButtons ? (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {result}
      <div
        className="navigationButtons"
        style={{ padding: "20px", justifyContent: "space-around" }}
      >
        <Button variant="contained" color="primary" onClick={tryAgain}>
          Try Again
        </Button>
        <Button variant="contained" color="primary" onClick={goBackToHomePage}>
          Go Back to Home Page
        </Button>
      </div>
      </div>
    ) : null;
  };

  return (
    <div className = 'questionHome'>
      <div className="questionHeading">Master Minds</div>
      {getQuestion()}
      {getaddtionalButtons()}
      <Modal
        buttonLabel="Start Quiz"
        heading="Instructions"
        instructions={quizInstructions}
        handleInstructionModalChange={handleInstructionModalChange}
        showInstructionModal={showInstructionModal}
      />
    </div>
  );
};

export default QuestionHome;
