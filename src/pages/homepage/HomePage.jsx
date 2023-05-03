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
import LeaguePage from "../leaguepage/LeaguePage";
import { async } from 'q';
import { set } from 'immutable';

const HomePage = () => {
  // States for all leagues, all countries data from API, filtered leagues and search input
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [filterEmpty, setFilterEmpty] = useState(true);
  const [leagueSearch, setLeagueSearch] = useState('');

  // Fetch all countries and all leagues data from API
  useEffect(() => {

    const getData = async () => {
      // First fetch to get the all countries data
      const firstResponse = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_countries.php');
      // Process the data of the fetch
      // Convert HTTP object in JSON
      const countriesData = await firstResponse.json();
      const allCountries = countriesData.countries;
      // Create an empty array for all leagues
      const allLeagues = [];
      // Use map to create an array of promises for fetching league data
      const leaguePromises = allCountries.map(async (country) => {
        const secondResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=${country.name_en}`);
        const allLeaguesData = await secondResponse.json();
        if (allLeaguesData.countries !== null) {
          allLeagues.push(...allLeaguesData.countries);
        }
      });
      // Use Promise.all to wait for all league fetches to complete
      await Promise.all(leaguePromises);
      // Update the leagues state
      setLeagues(allLeagues);
    };
    getData();
  }, []);

  // Checking if object is empty for async fetch
  const isObjEmpty = (leagues) => {
    return Object.keys(leagues).length === 0;
  };

  // Filter the leagues by country and sport and set the filtered leagues state
  const handleFilterData = (selectedCountries, selectedSports) => {
    const filteredLeagues = leagues.filter(league => {
      console.log(league);
      return selectedCountries.includes(league.strCountry) && selectedSports.includes(league.strSport);
    });
    setFilteredLeagues(filteredLeagues);
  }

  // Check if the filtered leagues array is empty and set the filterEmpty state
  const handleFilterEmpty = (boolean) => {
    setFilterEmpty(boolean);
  }

  // Render the homepage
  if (isObjEmpty(leagues) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
        <NavBar
          leagueSearch={leagueSearch}
          setLeagueSearch={setLeagueSearch} />
        <div>
          <section id='homeSection'>
            <img src={home_img} alt='baseball field' />
            <h2>Find your league</h2>
          </section>
        </div>
        <HashLink smooth to='/#homeSection'>
          <svg width="72" height="102" viewBox="0 0 72 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m 331.52267,-42.429092 v -5.641864 h -2.73672 c -1.50518,0 -2.73671,-0.01638 -2.73671,-0.0364 0,-0.04644 7.24241,-12.192889 7.32369,-12.282773 0.05,-0.05532 7.49673,12.138506 7.49673,12.27574 0,0.02389 -1.19364,0.04343 -2.65253,0.04343 h -2.65252 v 5.641864 5.641864 h -2.02097 -2.02097 z" fill="#E83539" />
          </svg>
        </HashLink>
        <FilterBar
          leagues={leagues}
          onFilterData={handleFilterData}
          onFilterEmpty={handleFilterEmpty} />
        <SportsList
          leagues={leagues}
          filteredLeagues={filteredLeagues}
          filterEmpty={filterEmpty}
          leagueSearch={leagueSearch} />
      </Fragment>
    );
  }
};

export default HomePage;
