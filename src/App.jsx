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
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              leagues={leagues}
              setLeagues={setLeagues}
              countries={countries}
              setCountries={setCountries}
            />
          }
        />
        <Route path="/leaguepage" element={<LeaguePage />} />
        <Route path="/:detailspage" element={<DetailsPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
