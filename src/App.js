import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/signin";
import SignUp from "pages/signup";
import Todos from "pages/todos";
import { useEffect } from "react";
import axios from "axios";
import customAxios from "api/ customAxios";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
