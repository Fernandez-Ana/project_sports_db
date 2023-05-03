// Infrastructure
import { Fragment } from "react";
import { Link } from "react-router-dom";
// Styling
import "./SportsList.scss";

const SportsList = ({ leagues, filteredLeagues, leagueSearch, filterEmpty }) => {

  // Sorting leagues alphabetically and data arrays for rendering list
  let allLeaguesArr = leagues.leagues.sort((x, y) => x.strLeague > y.strLeague ? 1 : -1,);
  let filteredLeaguesArr = filteredLeagues.sort((x, y) => x.strLeague > y.strLeague ? 1 : -1,);

  // Filtering leagues according to search input
  if (leagueSearch !== '' && filterEmpty === true) {
    allLeaguesArr = allLeaguesArr.filter((elt) => {
      return (
        elt.strLeague.toLowerCase().includes(leagueSearch.toLowerCase())
      )
    })
  } else if (leagueSearch !== '' && filterEmpty === false) {
    filteredLeaguesArr = filteredLeaguesArr.filter((elt) => {
      return (
        elt.strLeague.toLowerCase().includes(leagueSearch.toLowerCase())
      )
    })
  }

  const groupLeaguesByFirstLetter = leagues => {
    return leagues.reduce((acc, league) => {
      const firstLetter = league.strLeague[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(league);
      return acc;
    }, {});
  };




  return (
    <Fragment>
      <section className='league-section'>
        <ul>
          {filterEmpty ? (
            allLeaguesArr.map(league => (
              <li key={league.idLeague} className='list-element'>
                <Link to={`/${league.strLeague}`} className='league-link'>
                  <span className='league-link-league'>{league.strLeague}</span>
                  <span className='league-link-sport'> {league.strSport}</span>
                </Link>
              </li>
            ))
          ) : (
            filteredLeaguesArr.map(league => (
              <li key={league.idLeague} className='list-element'>
                <Link to={`/${league.strLeague}`} className='league-link'>
                  <span className='league-link-league'>{league.strLeague}</span>
                  <span className='league-link-sport'> {league.strSport}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </Fragment>
  );
};

export default SportsList;
