import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import { APIEndPoints } from "../../APIEndpoints/ApiEndPoints";

export default function GenericCard({ imageAddress, description, title }) {
  const history = useHistory();

  const handleClick = async (event) => {
    const category = event.target.id;
    const response = await axios.get(APIEndPoints.getQuestions(category));
    history.push({
      pathname: "/quiz",
      state: { questionList: response.data },
    });
    console.log(history, response);
  };
  return (
    <div className="card" onClick={handleClick} id={title}>
      <img
        src={imageAddress}
        width="100%"
        height="60%"
        className="image"
        alt={title}
        id={title}
      />
      <div style={{ margin: "10px" }}>
        <h2 id={title}>{title}</h2>
        <p id={title}>{description}</p>
        <span id={title}>Click to Start!</span>
      </div>
    </div>
  );
}
