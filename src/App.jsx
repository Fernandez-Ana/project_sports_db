//Infrastructure
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
// Components
import HomePage from "./pages/homepage/HomePage";
import LeaguePage from "./pages/leaguepage/LeaguePage";
import DetailsPage from "./pages/detailspage/DetailsPage";
// Styling
import "./App.scss";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:leaguename" element={<LeaguePage />} />
        <Route path="/:leaguename/detailspage" element={<DetailsPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
