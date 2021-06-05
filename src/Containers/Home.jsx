import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isUserLoggedIn } from "../utils/commonFunctions";
import NavigationBar from "./Navbar";
import GenericCard from './Components/GenericCard';
import { quizCategories } from '../utils/generalData';
import "./Container.css"; 

const Home = (props) => {
  let history = useHistory();
  let [admin, setAdmin] = useState(false);

  useEffect(async () => {
    const userInformation = await isUserLoggedIn();
    if (userInformation.admin) {
      setAdmin(true);
    }
  }, []);

  const handleAddQuiz = () => {
    history.push("/addquiz");
  };
  return (
    <div>
      <NavigationBar />
      {admin ? (
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={handleAddQuiz}
        >
          Add Quiz
        </Button>
      ) : null}
      <div className="cardContainer">
        {quizCategories.map((quiz, index) => {
          const { imageAddress, label, description } = quiz;
          return (
            <GenericCard
              key={index}
              imageAddress={imageAddress}
              title={label}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
