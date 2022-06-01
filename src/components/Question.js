import React, { useEffect, useState } from "react";
import { useQuizContext } from "../contexts/QuizContext";
import { MdHelp } from "react-icons/md";

const AnswerButton = ({ answer, feedback, ...rest }) => {
  return (
    <button
      className="answer-button"
      style={{
        width: "100%",
        transition: "background-color 0.33s",
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
  const {
    currentQuestion,
    totalPoints,
    currentPoints, // object, manage points for current question - format: { points: x, locked: <true/false> }
    wrongAnswer, // function, sets points = 0 and locked = true
    addCurrentPoints, // function, takes parameter x and adds x to currentPoints
  } = useQuizContext();
  // remembers clicked answers in form of { answer-<index>: true, ... }
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  // gives visual feedback for selected answers in form of [null/correct/incorrect,...] (using <answer-index> as index)
  const [answerFeedback, setAnswerFeedback] = useState({});

  // ---------- RESET ----------
  // If you jump to the next question, there should be a reset of selected answers and their visual feedback
  useEffect(() => {
    // reset selected answers
    setSelectedAnswers({});
    // reset visual feedback (each element of array represents corresponding answer)
    setAnswerFeedback({});
  }, [currentQuestion]);

  // ---------- GAME LOGIC ----------
  // If you select an answer, check if it's correct or not, give visual feedback about being right/wrong and calculate points
  useEffect(() => {
    if (selectedAnswers !== null) {
      // console.log("----------");
      // console.log("selectedAnswers:", selectedAnswers);
      // // console.log("question.answers", question.answers);
      // console.log("answerFeedback:", answerFeedback);

      // // Look through selectedAnswers
      // console.log("Object.keys():", Object.keys(selectedAnswers));

      let newFeedback = { ...answerFeedback };
      Object.keys(selectedAnswers).forEach((answerIndex) => {
        // console.log(
        //   answerIndex,
        //   selectedAnswers[answerIndex],
        //   question.answers[answerIndex].points
        // );
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
      // console.log("answerFeedback:", answerFeedback);
    }
  }, [selectedAnswers]);

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
              // console.log("Button onClick:", answer.points);
              if (answer.points && !currentPoints.locked) addCurrentPoints(1);
              else wrongAnswer();
            }}
          />
        );
      })}
      {/* <button
        onClick={() => {
          setPoints(4);
        }}
      >
        Test Context (totalPoints)
      </button> */}
      {/* <button
        onClick={() => {
          setNextQuestion(currentQuestion + 1);
        }}
      >
        Test Context (currentQuestion)
      </button> */}
      <p>currentPoints: {JSON.stringify(currentPoints)}</p>
      <p>totalPoints: {totalPoints}</p>
      <p>currentQuestion: {currentQuestion}</p>
    </div>
  );
};
