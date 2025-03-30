import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* <Route path="/form" element={<FormPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
