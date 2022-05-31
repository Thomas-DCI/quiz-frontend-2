import React, { useState, useEffect } from "react";
import { Question } from "./Question";
import axios from "axios";

export const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
        }}
      >
        {currentQuestion > -1 ? (
          <Question
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion} // will be replaced by Context
          />
        ) : undefined}
        <button
          style={{
            marginTop: 20,
            minWidth: 180,
            alignSelf: "end",
          }}
          disabled={currentQuestion >= questions.length - 1}
          onClick={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
