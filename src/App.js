import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "pages/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
