import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCandidate from "./components/AddCandidateForm";
import PositionDetail from "./components/PositionDetail";
import Positions from "./components/Positions";
import RecruiterDashboard from "./components/RecruiterDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/positions/:id" element={<PositionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
