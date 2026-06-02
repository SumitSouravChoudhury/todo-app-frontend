import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Todo from "./containers/Todo";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Todo />} />

        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </>
  );
}

export default App;
