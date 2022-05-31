import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { Question } from "./Question";

export const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  // currentQuestion is the index of the current question from the questions array,
  // comes from Context and starts with -1
  const { currentQuestion, setNextQuestion, totalPoints } = useUser();

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
          position: "relative",
        }}
      >
        {/* Overlay for total points */}
        {currentQuestion > -1 ? (
          <div className="overlay__points">{totalPoints}</div>
        ) : null}
        {currentQuestion > -1 ? (
          <Question
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
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
              setNextQuestion(currentQuestion + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
