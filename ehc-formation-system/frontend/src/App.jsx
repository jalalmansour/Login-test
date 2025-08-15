import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h1>EHC Training Hub</h1>
        <Routes>
          {/* Add your routes here */}
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* etc. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;