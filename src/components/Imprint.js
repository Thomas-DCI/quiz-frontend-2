import React from "react";
import "./Imprint.css";

export const Imprint = () => {
  return (
    <main>
      <h2>Webentwicklungs-Quiz</h2>
      <p>
        Entstanden im Mai 2022 im Rahmen eines SCRUM-Übungsprojektes.
        Sprintdauer: 1,5 Tage.
      </p>
      <h3>Woche #2</h3>
      <p className="paragraphWithIcon">
        Frontend: Ralf
        <a
          className="link__icon"
          href="https://github.com/ralf-siewert-dci/quiz-frontend"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="icon"
            src="icons/PNG/GitHub-Mark-32px.png"
            alt="GitHub Link"
          />
        </a>
        <br />
      </p>
      <p>Backend & zusätzliches Frontend: Christian</p>
      <h3>Woche #1</h3>
      <p>
        Frontend - Woche #1: Thomas (Link:
        https://github.com/Thomas-DCI/quiz-frontend)
      </p>
      <p>
        Backend: Christian (Link:
        https://github.com/Christian-Heinrich-DCI/quiz-backend)
      </p>
      <p>
        Die Dokumentation des Front-/Backends befindet sich in der README.md des
        jeweiligen Repositories.
      </p>
    </main>
  );
};
