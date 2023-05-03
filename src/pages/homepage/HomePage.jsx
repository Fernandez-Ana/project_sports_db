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

const HomePage = () => {
  // States for all leagues, all countries data from API, filtered leagues and search input
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [filterEmpty, setFilterEmpty] = useState(true);
  const [leagueSearch, setLeagueSearch] = useState('');

  // Fetch all countries and all leagues data from API
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then((res) => res.json())
      .then((leagues) => {
        setLeagues(leagues)
      })
      ;
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
  }

  const handleFilterEmpty = (boolean) => {
    setFilterEmpty(boolean);
  }

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
            <mask id="mask0_913_483" maskUnits="userSpaceOnUse" x="4" y="4" width="64" height="96">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M67.9252 57.1896L35.769 4L4.00012 57.1895L26.5272 57.1895L26.5272 100H45.8984L45.8985 57.1895L67.9252 57.1896Z" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_913_483)">
              <rect width="64" height="96" transform="matrix(1 0 0 -1 4 100)" fill="none" />
            </g>
            <path d="M35.8062 4L37.5177 2.96528L35.7958 0.117051L34.0892 2.97445L35.8062 4ZM67.9625 57.1896V59.1896H71.5087L69.674 56.1548L67.9625 57.1896ZM4.03735 57.1895L2.32031 56.164L0.513219 59.1895H4.03735L4.03735 57.1895ZM26.5644 57.1895H28.5644V55.1895H26.5644V57.1895ZM26.5644 100H24.5644V102H26.5644V100ZM45.9357 100V102H47.9357V100H45.9357ZM45.9357 57.1895V55.1895H43.9357V57.1895H45.9357ZM34.0947 5.03472L66.2509 58.2243L69.674 56.1548L37.5177 2.96528L34.0947 5.03472ZM5.7544 58.2151L37.5232 5.02555L34.0892 2.97445L2.32031 56.164L5.7544 58.2151ZM26.5644 55.1895L4.03735 55.1895L4.03735 59.1895L26.5644 59.1895V55.1895ZM28.5644 100L28.5644 57.1895H24.5644L24.5644 100H28.5644ZM45.9357 98H26.5644V102H45.9357V98ZM43.9357 57.1895L43.9357 100H47.9357L47.9357 57.1895H43.9357ZM67.9625 55.1896L45.9357 55.1895V59.1895L67.9625 59.1896V55.1896Z" fill="#E83539" />
          </svg>
        </HashLink>
        <FilterBar
          leagues={leagues}
          countries={countries}
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
