import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
// import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
