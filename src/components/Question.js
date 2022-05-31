import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { MdHelp } from "react-icons/md";

const AnswerButton = ({ answer, feedback, ...rest }) => {
  return (
    <button className="answer-button" {...rest}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: feedback === "correct" ? "green" : null,
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
  // Context -- Note: currentQuestion = index
  const { currentQuestion, setPoints, totalPoints, setNextQuestion } =
    useUser();
  // remembers clicked answers in form of { answer-<index>: true, ... }
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // gives visual feedback for selected answers in form of [null/correct/incorrect,...] (using <answer-index> as index)
  const [answerFeedback, setAnswerFeedback] = useState([]);

  // If you select an answer, check if it's correct or not, give visual feedback about being right/wrong and calculate points
  useEffect(() => {
    if (selectedAnswer !== null) {
      console.log("useEffect!");
      console.log(selectedAnswer);
      console.log(question.answers);
      // console.log(currentQuestion);
    }
  }, [selectedAnswer]);

  // If you jump to the next question, there should be a reset of selected answers and their visual feedback
  useEffect(() => {
    // reset visual feedback (each element of array represents corresponding answer)
    const newFeedback = question.answers.map(() => null);
    // console.log(newFeedback);
    setAnswerFeedback(newFeedback);
    // reset selected answers
    if (currentQuestion > 0) {
      console.log("Frage ändert sich!");
      setSelectedAnswer(null);
    }
  }, [currentQuestion]);

  return (
    <div className="question-container">
      <h1 style={{ textAlign: "center" }}>{question.question}</h1>

      {question.answers.map((answer, index) => {
        return (
          <AnswerButton
            key={index}
            answer={answer}
            feedback={answerFeedback[index]}
            style={{ width: "100%" }}
            onClick={() => {
              setSelectedAnswer({
                ...selectedAnswer,
                [`answer-${index}`]: true,
              });
            }}
          />
        );
      })}
      <button
        onClick={() => {
          setPoints(totalPoints + 4);
        }}
      >
        Test Context (totalPoints)
      </button>
      <p>{totalPoints}</p>
      <button
        onClick={() => {
          setNextQuestion(currentQuestion + 1);
        }}
      >
        Test Context (currentQuestion)
      </button>
      <p>{currentQuestion}</p>
    </div>
  );
};
