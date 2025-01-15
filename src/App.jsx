import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneSignup from "./components/PhoneSignup";

function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Navigate to the signup page to get started.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<PhoneSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
