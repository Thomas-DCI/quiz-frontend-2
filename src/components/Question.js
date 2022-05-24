import React from "react";
import "../App.css";
import { MdHelp } from "react-icons/md";

const AnswerButton = ({ answer, ...rest }) => {
  return (
    <button className="answer-button" {...rest}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
            flexGrow: 1,
          }}
        >
          <MdHelp style={{ fontSize: "3.4em", color: "var(--pale-green)" }} />
        </div>
      </div>
    </button>
  );
};

export const Question = ({ question }) => {
  return (
    <div className="question-container">
      <h1 style={{ textAlign: "center" }}>{question.question}</h1>

      {question.answers.map((answer) => {
        return <AnswerButton answer={answer} style={{ width: "100%" }} />;
      })}
    </div>
  );
};
