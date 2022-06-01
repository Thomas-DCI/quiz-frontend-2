import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { MdHelp } from "react-icons/md";

const AnswerButton = ({ answer, feedback, ...rest }) => {
  return (
    <button
      className="answer-button"
      style={{
        width: "100%",
        backgroundColor:
          feedback === "correct"
            ? "var(--green)"
            : feedback === "incorrect"
            ? "var(--red)"
            : null,
      }}
      {...rest}
    >
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
          <MdHelp style={{ fontSize: "3.33rem", color: "#ffffff55" }} />
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
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  // gives visual feedback for selected answers in form of [null/correct/incorrect,...] (using <answer-index> as index)
  const [answerFeedback, setAnswerFeedback] = useState({});

  // If you select an answer, check if it's correct or not, give visual feedback about being right/wrong and calculate points
  useEffect(() => {
    if (selectedAnswers !== null) {
      console.log("----------");
      console.log("selectedAnswers:", selectedAnswers);
      // console.log("question.answers", question.answers);
      console.log("answerFeedback:", answerFeedback);

      // Look through selectedAnswers
      console.log("Object.keys():", Object.keys(selectedAnswers));

      let newFeedback = { ...answerFeedback };
      Object.keys(selectedAnswers).forEach((answerIndex) => {
        console.log(
          answerIndex,
          selectedAnswers[answerIndex],
          question.answers[answerIndex].points
        );
        // figure out if selected answer was correct or not
        let result;
        if (question.answers[answerIndex].points) {
          result = "correct";
          // setze punkte hoch
        } else {
          // punkte für diese frage auf 0 setzen und sperren,
          // dass weitere punkte hinzugefügt werden können
          result = "incorrect";
        }
        newFeedback = { ...newFeedback, [answerIndex]: result };
      });
      setAnswerFeedback(newFeedback);
      console.log("answerFeedback:", answerFeedback);
    }
  }, [selectedAnswers]);

  // If you jump to the next question, there should be a reset of selected answers and their visual feedback
  useEffect(() => {
    // reset selected answers
    setSelectedAnswers({});
    // reset visual feedback (each element of array represents corresponding answer)
    setAnswerFeedback({});
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
            onClick={() => {
              setSelectedAnswers({
                ...selectedAnswers,
                [index]: true,
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
