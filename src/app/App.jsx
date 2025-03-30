import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import FormPage from "../Pages/FormPage/FormPage"; // Your target page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<FormPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
