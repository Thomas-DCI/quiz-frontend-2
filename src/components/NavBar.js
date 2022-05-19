import React from "react";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <footer>
      <div className="footercontainer">
        <Link to="/highscores">Highscores</Link>
        <Link to="/imprint">Impressum</Link>
      </div>
    </footer>
  );
};
