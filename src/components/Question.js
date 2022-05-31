import React from "react";
import "../App.css";
import { MdHelp } from "react-icons/md";
import { useUser } from "../contexts/UserContext";

const AnswerButton = ({ answer, ...rest }) => {
  return (
    <button className="answer-button" {...rest}>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {answer.answer}
        </div>
        <div
          style={{
            padding: 8,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexGrow: 1
          }}
        >
          <MdHelp style={{ fontSize: "3.4em", color: "var(--pale-green)" }} />
        </div>
      </div>
    </button>
  );
};

export const Question = ({ question }) => {
  const { currentQuestion, setPoints, totalPoints, setNextQuestion } =
    useUser();
  return (
    <div className="question-container">
      <h1 style={{ textAlign: "center" }}>{question.question}</h1>

      {question.answers.map((answer) => {
        return <AnswerButton answer={answer} style={{ width: "100%" }} />;
      })}
      <button
        onClick={() => {
          setPoints(totalPoints + 4);
        }}
      >
        Test Context (totalPoints);
      </button>
      <button
        onClick={() => {
          setNextQuestion(currentQuestion + 1);
        }}
      >
        Test Context (currentQuestion)
      </button>
    </div>
  );
};
