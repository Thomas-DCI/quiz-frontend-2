import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Imprint.css";

export const Imprint = () => {
  return (
    <main>
      <h2>Webentwicklungs-Quiz</h2>
      <p>
        Entstanden im Mai 2022 im Rahmen eines SCRUM-Übungsprojektes.
        Sprintdauer: 1 Woche.
      </p>
      <p>
        Die Dokumentation des Front-/Backends befindet sich in der README.md des
        jeweiligen Repositories.
      </p>
      <h3>Woche #3</h3>
      Frontend: Thomas, Christian
      <h3>Woche #2</h3>
      <p className="paragraphWithIcon">
        <a
          className="link__icon"
          href="https://github.com/ralf-siewert-dci/quiz-frontend"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={"21"} />
        </a>
        Frontend: Ralf
        <br />
      </p>
      <p>Backend & zusätzliches Frontend: Christian</p>
      <h3>Woche #1</h3>
      <p className="paragraphWithIcon">
        <a
          className="link__icon"
          href="https://github.com/Thomas-DCI/quiz-frontend"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={"21"} />
        </a>
        Frontend: Thomas
      </p>
      <p className="paragraphWithIcon">
        <a
          className="link__icon"
          href="https://github.com/Christian-Heinrich-DCI/quiz-backend"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={"21"} />
        </a>
        Backend: Christian
      </p>
    </main>
  );
};
