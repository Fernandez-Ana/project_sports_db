// Infrastructure
import { Fragment, useState } from "react";
// Styling
import "./FilterBar.scss";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

const FilterBar = ({ leagues, countries }) => {
  console.log(countries.countries);
  console.log(leagues.leagues);

  const countriesArr = countries.countries;
  const leaguesArr = leagues.leagues;

  return (
    <Fragment>
      <h1>FilterBar</h1>

    </Fragment>
  );
};

export default FilterBar;
