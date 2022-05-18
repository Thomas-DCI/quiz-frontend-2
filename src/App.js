import "./App.css";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <>
      <header>CoderQuizz</header>
      <Outlet />
      <NavBar />
    </>
  );
}

export default App;
