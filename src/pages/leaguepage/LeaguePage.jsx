// Infrastructure
import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/navbar/Navbar";
// Styling
import "./LeaguePage.scss";
// Image
import leagueImg from "../../assets/img/league_img.png";

const LeaguePage = () => {
  // Getting league name from url
  const leagueParams = useParams();
  // Setting state for data fetch
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching data from API for display teams and detail page
  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueParams.leaguename}`
    )
      .then((res) => res.json())
      .then((teams) => {
        setTeams(teams.teams);
        setIsLoading(false);
      });
  }, [leagueParams.leaguename, leagueParams.strSport]);

  const isObjEmpty = (teams) => {
    return teams ? Object.keys(teams).length === 0 : true;
  };

  if (isLoading) {
    return <div>loading</div>;
  } else if (isObjEmpty(teams)) {
    return (
      <div>
        <NavBar />
        <h1>Leider konnten wir nichts finden </h1>
      </div>
    );
  } else {
    return (
      <Fragment>
        <section className="leaguepage">
          <article>
            <img src={leagueImg} alt="leaguepage" />
            <div className="font-container">
              <h2>{leagueParams.leaguename}</h2>
              <h3 className="sport-type">{teams[0].strSport}</h3>
            </div>
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
