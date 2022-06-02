import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuizContext } from "../contexts/QuizContext";
import { Question } from "./Question";
import "./QuizScreen.css";

export const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  // currentQuestion is the index of the current question from the questions array,
  // comes from Context and starts with -1
  const {
    currentQuestion,
    setNextQuestion,
    currentPoints,
    totalPoints,
    addTotalPoints,
    resetCurrentPoints,
    setQuizFinished,
  } = useQuizContext();
  const navigate = useNavigate();

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
        marginBottom: "2.5rem",
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
        {currentQuestion > -1 ? (
          <Question
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
          />
        ) : undefined}
        <div
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {currentQuestion > -1 ? (
            <p
              style={{
                fontSize: "1rem",
              }}
            >
              <strong>Aktuelle Punkte:</strong> {currentPoints.points}
              <br />
              <strong>Gesamt-Punkte:</strong> {totalPoints}
            </p>
          ) : null}
          <button
            className="nextQuestion__button"
            style={{
              minWidth: 180,
              fontSize: "1rem",
            }}
            // disabled={currentQuestion >= questions.length - 1}
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                // console.log(currentPoints);
                // Wenn Frage nicht falsch beantwortet wurde
                // werden die aktuellen Punkte zu den Gesamtpunkten
                // hinzu addiert
                if (!currentPoints.locked) {
                  addTotalPoints(currentPoints.points);
                }
                // bevor es zur nächsten Frage geht, werden die
                // aktuellen Punkte zurück gesetzt
                resetCurrentPoints();
                setNextQuestion(currentQuestion + 1);
              } else {
                setQuizFinished(true);
                navigate("/highscores");
              }
            }}
          >
            Nächste Frage
          </button>
        </div>
      </div>
    </div>
  );
};
