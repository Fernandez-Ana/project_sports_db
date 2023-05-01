// Infrastructure
import { Fragment } from "react";
import { useState, useEffect } from "react";
// Components
import SportsList from "../../components/sportslist/SportsList";
import NavBar from "../../components/navbar/Navbar";
import FilterBar from "../../components/filterbar/FilterBar";
// Styling
import "./HomePage.scss";

const HomePage = () => {
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);
  const [leagueSearch, setLeagueSearch] = useState('')

  console.log();
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then((res) => res.json())
      .then((leagues) => setLeagues(leagues));
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_countries.php")
      .then((res) => res.json())
      .then((countries) => setCountries(countries));
  }, []);

  // Checking if object is empty for async fetch
  const isObjEmpty = (leagues) => {
    return Object.keys(leagues).length === 0;
  };

  if (isObjEmpty(leagues) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
        <h1>Home Page</h1>
        <NavBar leagueSearch={leagueSearch} setLeagueSearch={setLeagueSearch} />
        <FilterBar leagues={leagues} countries={countries} />
        <SportsList leagues={leagues} countries={countries} />
      </Fragment>
    );
  }
};

export default HomePage;
