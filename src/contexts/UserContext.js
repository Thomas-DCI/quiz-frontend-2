import { useEffect, useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setPoints = (p) => {
    setTotalPoints(totalPoints + p);
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
    <UserContext.Provider
      value={{
        totalPoints,
        currentQuestion,
        setNextQuestion,
        setPoints
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
