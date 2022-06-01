import { useEffect, useState, createContext, useContext } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  // Points for "local use" (calculated new for each question)
  // also manages case of a wrong answer (points = 0, no more answers possible)
  const [currentPoints, setCurrentPoints] = useState({
    points: 0,
    locked: false,
  });
  const [quizFinished, setQuizFinished] = useState(false);

  const setPointsTotal = (p) => {
    setTotalPoints(parseInt(totalPoints + p));
  };

  const setNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  // If wrong answer was clicked, reset to points for current question to 0
  // and lock current question from any further answers
  const wrongAnswer = () => {
    setCurrentPoints({ points: 0, locked: true });
  };

  const addCurrentPoints = (p) => {
    setCurrentPoints({ points: currentPoints.points + p, locked: false });
  };

  useEffect(() => {
    if (totalPoints > 0) {
      console.log(`points is ${totalPoints}`);
    }
    console.log(`currentQuestion is ${currentQuestion}`);
  }, [totalPoints, currentQuestion]);

  return (
    <QuizContext.Provider
      value={{
        totalPoints,
        setPointsTotal,
        currentQuestion,
        setNextQuestion,
        currentPoints,
        wrongAnswer,
        addCurrentPoints,
        quizFinished,
        setQuizFinished,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};
