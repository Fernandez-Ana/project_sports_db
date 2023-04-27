// Infrastructure
import { Fragment } from "react";
import { useState, useEffect } from "react";
// Components
import SportsList from "../../components/sportslist/SportsList";
import NavBar from "../../components/navbar/Navbar";
// Styling
import "./HomePage.scss";

const HomePage = (props) => {
  console.log(props);
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then((res) => res.json())
      .then((leagues) => props.setLeagues(leagues));
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_countries.php")
      .then((res) => res.json())
      .then((countries) => props.setCountries(countries));
  }, []);

  console.log(props.leagues);
  console.log(props.countries);

  return (
    <Fragment>
      <h1>Home Page</h1>
      <NavBar />

      <SportsList leagues={props.leagues} />
    </Fragment>
  );
};

export default HomePage;
