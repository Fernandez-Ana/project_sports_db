// Infrastructure
import { Fragment, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
// Styling
import "./LeaguePage.scss";

const LeaguePage = () => {
  // Getting league name from url
  let leagueParams = useParams();
  // Setting state for data fetch
  const [teams, setTeams] = useState([]);
  // Checking if object is empty for async fetch
  const isObjEmpty = (teams) => {
    return Object.keys(teams).length === 0;
  };
  

  // Fetching data from API for display teams and detail page
  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueParams.leaguename}`
    )
      .then((res) => res.json())
      .then((teams) => {
        setTeams(teams.teams);
      });
  }, []);

// Displays "Loading" if Obj is Empty
  if (isObjEmpty(teams) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
        <h1>League Page</h1>
        <Link to="/detailspage">Details Page</Link>
        <section>
          <ul>
            {teams.map((team) => {
              return (
                <li key={team.idTeam}>
                  <Link to={`/${team.strTeam}/detailspage`} state={team}>
                    {team.strTeam}
                    <span>{team.strStadiumLocation}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Fragment>
    );
  }
};

export default LeaguePage;
