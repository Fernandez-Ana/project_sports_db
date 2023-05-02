// Infrastructure
import { Fragment } from "react";
import { Link } from "react-router-dom";
// Styling
import "./SportsList.scss";
// Components
import FilterBar from "../filterbar/FilterBar";

const SportsList = (props) => {

  let allLeagues = props.leagues.leagues;
  const allCountries = props.countries.countries;

  // console.log(allLeagues[0].idLeague);

  if (props.leagueSearch !== '') {
    allLeagues = allLeagues.filter((elt) => {
      return (
        elt.strLeague.toLowerCase().includes(props.leagueSearch.toLowerCase())
      )
    })
  }

  return (
    <Fragment>
      <Link to="/leaguepage">League Page</Link>
      <section>
        <ul>
          {allLeagues.map((league) => {
            return (
              <li key={league.idLeague}>
                <Link to={`/${league.strLeague}`}>
                  {league.strLeague}
                  <span>{league.strSport}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Fragment>
  );
};

export default SportsList;
