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
  // States for all leagues, all countries data from API, filtered leagues and search input
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [leagueSearch, setLeagueSearch] = useState('')

<<<<<<< HEAD
  // console.log();
=======
  // Fetch all countries and all leagues data from API
>>>>>>> 423aa6525e268c27f92c57066c356b0c5fa4e0f4
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then((res) => res.json())
      .then((leagues) => setLeagues(leagues));
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_countries.php")
      .then((res) => res.json())
      .then((countries) => setCountries(countries));
  }, []);

<<<<<<< HEAD
  // console.log(countries);
  // console.log(leagues);

=======
>>>>>>> 423aa6525e268c27f92c57066c356b0c5fa4e0f4
  // Checking if object is empty for async fetch
  const isObjEmpty = (leagues) => {
    return Object.keys(leagues).length === 0;
  };

  // Fetch data from API according to selected countries and sports selected in FilterBar
  const handleFilterData = async (selectedCountries, selectedSports) => {
    // Array for filtered leagues
    const filteredLeagues = [];
    // Fetching data from API for each country and sport according to selected countries and sports from FilterBar
    for (const country of selectedCountries) {
      for (const sport of selectedSports) {
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=${country}&s=${sport}`);
        const leagues = await res.json();
        if (leagues.countries !== null) {
          const mappedLeagues = leagues.countries.map(league => ({
            league: league.strLeague,
            sport: league.strSport
          }));
          filteredLeagues.push(...mappedLeagues);
        }
      }
    }
    console.log(filteredLeagues);
  }

  if (isObjEmpty(leagues) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
<<<<<<< HEAD
        {/* <h1>Home Page</h1> */}
        <NavBar setLeagueSearch={setLeagueSearch} />
        <FilterBar leagues={leagues} countries={countries} />
        <SportsList leagues={leagues} countries={countries} leagueSearch={leagueSearch} />
=======
        <NavBar leagueSearch={leagueSearch} setLeagueSearch={setLeagueSearch} />
        <FilterBar leagues={leagues} countries={countries} onFilterData={handleFilterData}/>
        <SportsList leagues={leagues} countries={countries} filteredLeagues={filteredLeagues} />
>>>>>>> 423aa6525e268c27f92c57066c356b0c5fa4e0f4
      </Fragment>
    );
  }
};

export default HomePage;
