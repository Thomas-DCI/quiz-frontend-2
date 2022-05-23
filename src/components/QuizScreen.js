import React, { useState, useEffect } from "react";
import axios from "axios";
export const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);

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

  return <div>{JSON.stringify(questions)}</div>;
};
