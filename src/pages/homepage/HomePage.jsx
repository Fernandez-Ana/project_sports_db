// Infrastructure
import { Fragment } from "react";
import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
// Components
import SportsList from "../../components/sportslist/SportsList";
import NavBar from "../../components/navbar/Navbar";
import FilterBar from "../../components/filterbar/FilterBar";
// Styling
import "./HomePage.scss";
import home_img from '../../assets/img/home_img.png'
import arrow from '../../assets/img/arrow.svg'

const HomePage = () => {
  // States for all leagues, all countries data from API, filtered leagues and search input
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [leagueSearch, setLeagueSearch] = useState('')

  // Fetch all countries and all leagues data from API
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
            idLeague: league.idLeague,
            strLeague: league.strLeague,
            strSport: league.strSport
          }));
          filteredLeagues.push(...mappedLeagues);
        }
      }
    }
    setFilteredLeagues(filteredLeagues);
    console.log(filteredLeagues);
  }

  if (isObjEmpty(leagues) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
        <NavBar leagueSearch={leagueSearch} setLeagueSearch={setLeagueSearch} />
        <div>
          <section id='homeSection'>
            <img src={home_img} alt='baseball field' />
            <h2>Find your league</h2>
          </section>
        </div>
        {/* <HashLink smooth to='/#homeSection'><img src={arrow} alt='arrow' className='arrow' /></HashLink> */}
        <HashLink smooth to='/#homeSection'>
          <svg width="72" height="102" viewBox="0 0 72 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m 331.52267,-42.429092 v -5.641864 h -2.73672 c -1.50518,0 -2.73671,-0.01638 -2.73671,-0.0364 0,-0.04644 7.24241,-12.192889 7.32369,-12.282773 0.05,-0.05532 7.49673,12.138506 7.49673,12.27574 0,0.02389 -1.19364,0.04343 -2.65253,0.04343 h -2.65252 v 5.641864 5.641864 h -2.02097 -2.02097 z" fill="#E83539" />
          </svg>
        </HashLink>
        {/* <Link  smooth to='/'><img src={arrow} alt='arrow' className='arrow' /></Link> */}
        <FilterBar leagues={leagues} countries={countries} onFilterData={handleFilterData} />
        <SportsList leagues={leagues} countries={countries} filteredLeagues={filteredLeagues} leagueSearch={leagueSearch} />
      </Fragment >
    );
  }
};

export default HomePage;
