import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Highscores.css";
import { useQuizContext } from "../contexts/QuizContext";
export const Highscores = () => {
  // ----- State for Highscores -----
  const [highscores, setHighscores] = useState([]);
  const { quizFinished, totalPoints, setPoints } = useQuizContext();
  const [userHighScore, setUserHighScore] = useState({ player: "", points: 0 });
  const [highScoreSaved, setHighScoreSaved] = useState(false);
  // ----- Load Highscores, when loading Component -----
  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/highscores`
        );
        const sortedScores = [...response.data];
        // Sorts highscore first by points and in case of
        // same points sorts it then alphabetically
        sortedScores.sort((a, b) => {
          if (a.points > b.points) return -1;
          else if (a.points < b.points) return 1;
          // if points are the same, sort alphabetically
          else {
            if (a.player > b.player) return 1;
            else return -1;
          }
        });
        setHighscores(sortedScores);
      } catch (err) {
        console.log(err);
      }
    };
    loadHighscore();
  }, []);
  useEffect(() => {
    console.log({ userHighScore });
  }, [userHighScore]);

  const saveHighscore = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/highscores`,
        userHighScore
      );
      console.log(response);
      setHighScoreSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ----- Render Component -----
  return (
    <main className="highscores__container">
      <h2>Highscores</h2>
      {/* <div>{JSON.stringify(highscores)}</div> */}
      <table className="highscores__table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((highscore, index) => (
            <tr key={`hs-${index}`}>
              <td>{index + 1}</td>
              <td>{highscore.player}</td>
              <td>{highscore.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {quizFinished !== true ? (
        <div>
          {`Du hast ${totalPoints} Punkte erreicht.`}
          <br />
          {"Trage Deinen Namen ein und speichere Deinen Highscore:"}
          <br />
          <input
            type="text"
            defaultValue=""
            placeholder="Dein Name"
            minLength={2}
            onChange={(e) => {
              setUserHighScore({ player: e.target.value, points: totalPoints });
            }}
          />
          <button onClick={() => saveHighscore()}>Speichern</button>
        </div>
      ) : undefined}
    </main>
  );
};
