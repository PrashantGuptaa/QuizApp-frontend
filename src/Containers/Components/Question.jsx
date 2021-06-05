import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button, Typography, BootstrapButton } from "@material-ui/core";

export default function Question({
  question,
  option1,
  option2,
  option3,
  option4,
  correctAnswer,
  handleQuestionChange,
  questionNum,
  answer,
  handleSubmission
}) {
  let [value, setValue] = React.useState(answer);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleQuestionNavigation = (operation) => {
    handleQuestionChange(operation, value);
  };

  const handleSubmit = () => {
    handleSubmission();
  };

  return (
    <div className="question">
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <h3>Q{questionNum}: {question}</h3>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Option A"
            control={<Radio />}
            label={option1}
          />
          <FormControlLabel
            value="Option B"
            control={<Radio />}
            label={option2}
          />
          <FormControlLabel
            value="Option C"
            control={<Radio />}
            label={option3}
          />
          <FormControlLabel
            value="Option D"
            control={<Radio />}
            label={option4}
          />
        </RadioGroup>
        <div className="navigationButtons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleQuestionNavigation("decrement")}
          //  style={{ marginLeft: "0px" }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleQuestionNavigation("increment")}
           style={{ marginRight: "50px" }}
          >
            Next
          </Button>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginRight:'70px'}}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100px", marginTop: "30px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        </div>
      </FormControl>
    </div>
  );
}
