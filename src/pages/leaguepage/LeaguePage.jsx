// Infrastructure
import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/navbar/Navbar";
// Styling
import "./LeaguePage.scss";
// Image
import leagueImg from '../../assets/img/league_img.png'

const LeaguePage = () => {
  // Getting league name from url
  let leagueParams = useParams();
  // Setting state for data fetch
  const [teams, setTeams] = useState([]);


  // Fetching data from API for display teams and detail page
  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueParams.leaguename}`
    )
      .then((res) => res.json())
      .then((teams) => {
        setTeams(teams.teams);
      });
  }, [leagueParams.leaguename]);

  // Checking if object is empty for async fetch
  const isObjEmpty = (teams) => {
    return Object.keys(teams || {}).length === 0;
  };



  if (isObjEmpty(teams) === true) {
    return <div>loading</div>;
  } else {
    return (
      <Fragment>
        <NavBar />
        <section className="leaguepage">
        <article>
        <img src={leagueImg} alt="leaguepage"/>
        <h2>{leagueParams.leaguename}</h2>
        <h3>{leagueParams.strSport}</h3>
        </article>
          <ul>
            {teams.map((team) => {
              return (
                <li key={team.idTeam}>
                  <Link to={`/${team.strTeam}/detailspage`} state={team}>
                    {team.strTeam}
                    <span className="stadium">{team.strStadiumLocation}</span>
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
