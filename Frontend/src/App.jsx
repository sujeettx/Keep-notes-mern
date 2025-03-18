import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Notes from "./Pages/Notes";
import Hero from "./Pages/Hero";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
