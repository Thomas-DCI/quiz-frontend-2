import { useEffect, useState, createContext, useContext } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const setPoints = (p) => {
    setTotalPoints(parseInt(totalPoints + p));
  };
  const setNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
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
        currentQuestion,
        setNextQuestion,
        setPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};
