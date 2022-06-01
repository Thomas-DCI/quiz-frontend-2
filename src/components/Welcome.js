import React from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <>
      <h1>Willkommen beim CoderQuizz!</h1>
      <p>
        Beim Coder-Quizz kannst Du Dein Wissen in den Bereichen React und
        Backend überprüfen.
      </p>
      <p>
        Richtige Antworten geben Punkte, die Du dann am Ende in die
        Highscore-Liste eintragen kannst.
      </p>
      <p>Viel Spaß und hol' Dir den Highscore!</p>
      <p>
        <Link to="/quiz">Zum Quiz!</Link> (beim ersten Mal auf next klicken!)
      </p>
    </>
  );
};
