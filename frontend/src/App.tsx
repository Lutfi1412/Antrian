import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NomorPage,
  PanggilanPage,
  LaporanPage,
  CustomerPage,
} from "./components/pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/nomor" element={<NomorPage />} />
        <Route path="/pages/panggilan" element={<PanggilanPage />} />
        <Route path="/pages/laporan" element={<LaporanPage />} />
        <Route path="/pages/customer" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
