import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Imprint } from "./components/Imprint";
import { Highscores } from "./components/Highscores";
import { QuizScreen } from "./components/QuizScreen";
import { QuizContextProvider } from "./contexts/QuizContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/highscores" element={<Highscores />} />
          <Route path="/quiz" element={<QuizScreen />}>
            <Route path="/quiz/:id" element={<QuizScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QuizContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
