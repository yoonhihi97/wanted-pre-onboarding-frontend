import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/signin";
import SignUp from "pages/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
