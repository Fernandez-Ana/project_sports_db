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

  return (
    <Fragment>
      <Link to="/leaguepage">League Page</Link>
      <section>
        <ul>
          {filterEmpty ? (
            allLeaguesArr.map(league => (
              <li key={league.idLeague}>
                <Link to={`/${league.strLeague}`}>
                  {league.strLeague}
                  <span>{league.strSport}</span>
                </Link>
              </li>
            ))
          ) : (
            filteredLeaguesArr.map(league => (
              <li key={league.idLeague}>
                <Link to={`/${league.strLeague}`}>
                  {league.strLeague}
                  <span>{league.strSport}</span>
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
