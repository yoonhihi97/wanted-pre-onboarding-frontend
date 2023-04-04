import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/signin";
import SignUp from "pages/signup";
import Todos from "pages/todos";

function App() {
  return (
    <BrowserRouter>
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
