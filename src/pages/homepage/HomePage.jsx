// Infrastructure
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'
// Components
import SportsList from "../../components/sportslist/SportsList";
import NavBar from "../../components/navbar/Navbar";
import FilterBar from "../../components/filterbar/FilterBar";
// Styling
import "./HomePage.scss";
import home_img from '../../assets/img/home_img.png';
import logo from '../../assets/img/logo.svg';

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
      return selectedCountries.includes(league.strCountry) && selectedSports.includes(league.strSport);
    });
    setFilteredLeagues(filteredLeagues);
  }

  // Check if the filtered leagues array is empty and set the filterEmpty state
  const handleFilterEmpty = (boolean) => {
    setFilterEmpty(boolean);
  }

  // scroll function for arrow
  const scroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  // Render the homepage
  if (isObjEmpty(leagues) === true) {
    return (
      <div className="main-fader" responsive-height-comments="true">
        <div className="loader">
          <svg className='loading-svg' viewBox="0 0 866 866" xmlns="http://www.w3.org/2000/svg">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.83 151.5">
              <path className="path-0" d="M117.24,69.24A8,8,0,0,0,115.67,67c-4.88-4-9.8-7.89-14.86-11.62A4.93,4.93,0,0,0,96.93,55c-5.76,1.89-11.4,4.17-17.18,6a4.36,4.36,0,0,0-3.42,4.12c-1,6.89-2.1,13.76-3,20.66a4,4,0,0,0,1,3.07c5.12,4.36,10.39,8.61,15.68,12.76a3.62,3.62,0,0,0,2.92.75c6.29-2.66,12.52-5.47,18.71-8.36a3.49,3.49,0,0,0,1.68-2.19c1.34-7.25,2.54-14.55,3.9-22.58Z"
                fill="#E83539" />
              <path className="path-1" d="M97.55,38.68A43.76,43.76,0,0,1,98,33.44c.41-2.36-.5-3.57-2.57-4.64C91.1,26.59,87,24,82.66,21.82a6.18,6.18,0,0,0-4-.71C73.45,22.55,68.32,24.25,63.22,26c-3.63,1.21-6.08,3.35-5.76,7.69a26.67,26.67,0,0,1-.6,4.92c-1.08,8.06-1.08,8.08,5.86,11.92,3.95,2.19,7.82,5.75,11.94,6.08s8.76-2.41,13.12-3.93c9.33-3.29,9.33-3.3,9.78-14Z"
                fill="#E83539" />
              <path className="path-2" d="M66.11,126.56c5.91-.91,11.37-1.7,16.81-2.71a3.3,3.3,0,0,0,1.87-2.17c1-4.06,1.73-8.19,2.84-12.24.54-2-.11-3-1.55-4.15-5-4-9.9-8.12-15-12a6.19,6.19,0,0,0-4.15-1.1c-5.35.66-10.7,1.54-16,2.54A4,4,0,0,0,48.34,97a109.13,109.13,0,0,0-3,12.19,4.47,4.47,0,0,0,1.34,3.6c5.54,4.36,11.23,8.53,16.91,12.69a10.84,10.84,0,0,0,2.57,1.11Z"
                fill="#E83539" />
              <path className="path-3" d="M127.42,104.12c4.1-2.1,8-3.93,11.72-6a6,6,0,0,0,2.27-3,58.22,58.22,0,0,0,3.18-29.92c-.26-1.7-8-7.28-9.71-6.85A5,5,0,0,0,133,59.65c-2.81,2.49-5.71,4.88-8.33,7.56a9.46,9.46,0,0,0-2.47,4.4c-1.29,6.49-2.38,13-3.35,19.55a5.73,5.73,0,0,0,.83,3.91c2.31,3.08,5,5.88,7.7,9Z"
                fill="#E83539" />
              <path className="path-4" d="M52.58,29.89c-2.15-.36-3.78-.54-5.39-.9-2.83-.64-4.92.1-7,2.32A64.1,64.1,0,0,0,26.09,54.64c-2.64,7.92-2.62,7.84,5.15,10.87,1.76.69,2.73.45,3.93-1C39.79,59,44.54,53.65,49.22,48.2a4.2,4.2,0,0,0,1.13-2c.8-5.32,1.49-10.68,2.24-16.34Z"
                fill="#E83539" />
              <path className="path-5" fill="#E83539" d="M23,68.13c0,2.51,0,4.7,0,6.87a60.49,60.49,0,0,0,9.75,32.15c1.37,2.13,6.4,3,7,1.2,1.55-5,2.68-10.2,3.82-15.34.13-.58-.58-1.38-.94-2.06-2.51-4.77-5.47-9.38-7.45-14.37C32.94,71,28.22,69.84,23,68.13Z" />
              <path className="path-6" fill="#E83539" d="M83.91,12.86c-.32.36-.66.71-1,1.07.9,1.13,1.57,2.62,2.73,3.33,4.71,2.84,9.56,5.48,14.39,8.1a9.29,9.29,0,0,0,3.13.83c5.45.69,10.89,1.38,16.35,1.94a10.41,10.41,0,0,0,3.07-.71c-11.48-9.9-24.26-14.61-38.71-14.56Z"
              />
              <path className="path-7" fill="#E83539" d="M66.28,132.51c13.36,3.78,25.62,3.5,38-.9C91.68,129.59,79.36,128,66.28,132.51Z" />
              <path className="path-8" fill="#E83539" d="M127.2,30.66l-1.27.37a18.58,18.58,0,0,0,1,3.08c3,5.52,6.21,10.89,8.89,16.54,1.34,2.83,3.41,3.82,6.49,4.9a60.38,60.38,0,0,0-15.12-24.9Z" />
              <path className="bb-9" fill="#E83539" d="M117.35,125c5.58-2.32,16.9-13.84,18.1-19.2-2.41,1.46-5.18,2.36-6.78,4.23-4.21,5-7.89,10.37-11.32,15Z" />
            </svg>
          </svg>
          <span className="loading-text">Still faster than Windows update.</span>
        </div>
      </div>
    )
  } else {
    return (
      <Fragment>
        <div className='flex-container-header'>
          <div className='logoContainer'>
            <img src={logo} alt='sports_db_logo' />
            <Link to='/'>
              <h1>Sports.db</h1>
            </Link>
          </div>
          <NavBar
            leagueSearch={leagueSearch}
            setLeagueSearch={setLeagueSearch} />
        </div>
        <div>
          <section className="homepage" id='homeSection'>
            <img src={home_img} alt='baseball field' />
            <h2>Find your league</h2>
          </section>
        </div>
        {/* <HashLink smooth to='/#homeSection'> */}
        <HashLink smooth onClick={scroll}>
          <svg className="red-arrow" width="72" height="102" viewBox="0 0 72 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_913_483" maskUnits="userSpaceOnUse" x="4" y="4" width="64" height="96">
              <path fillRule="evenodd" clipRule="evenodd" d="M67.9252 57.1896L35.769 4L4.00012 57.1895L26.5272 57.1895L26.5272 100H45.8984L45.8985 57.1895L67.9252 57.1896Z" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_913_483)">
              <rect width="64" height="96" transform="matrix(1 0 0 -1 4 100)" fill="none" />
            </g>
            <path d="M35.8062 4L37.5177 2.96528L35.7958 0.117051L34.0892 2.97445L35.8062 4ZM67.9625 57.1896V59.1896H71.5087L69.674 56.1548L67.9625 57.1896ZM4.03735 57.1895L2.32031 56.164L0.513219 59.1895H4.03735L4.03735 57.1895ZM26.5644 57.1895H28.5644V55.1895H26.5644V57.1895ZM26.5644 100H24.5644V102H26.5644V100ZM45.9357 100V102H47.9357V100H45.9357ZM45.9357 57.1895V55.1895H43.9357V57.1895H45.9357ZM34.0947 5.03472L66.2509 58.2243L69.674 56.1548L37.5177 2.96528L34.0947 5.03472ZM5.7544 58.2151L37.5232 5.02555L34.0892 2.97445L2.32031 56.164L5.7544 58.2151ZM26.5644 55.1895L4.03735 55.1895L4.03735 59.1895L26.5644 59.1895V55.1895ZM28.5644 100L28.5644 57.1895H24.5644L24.5644 100H28.5644ZM45.9357 98H26.5644V102H45.9357V98ZM43.9357 57.1895L43.9357 100H47.9357L47.9357 57.1895H43.9357ZM67.9625 55.1896L45.9357 55.1895V59.1895L67.9625 59.1896V55.1896Z" fill="#E83539" />
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
