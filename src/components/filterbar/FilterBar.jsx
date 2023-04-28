// Infrastructure
import { Fragment, useState } from "react";
// Styling
import "./FilterBar.scss";
// import { components } from "react-select";
// import { default as ReactSelect } from "react-select";

const FilterBar = ({ leagues, countries }) => {
  console.log(countries.countries);
  console.log(leagues.leagues);

  const countriesArr = countries.countries;
  const leaguesArr = leagues.leagues;


  const sportsArray = leaguesArr.map(elt => {
    return (elt.strSport)
  });
  console.log(sportsArray);

  const sportsSet = [...new Set(sportsArray)];
  console.log(sportsSet);

  let expanded = false;

  function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }




  return (
    <Fragment>
      <h1>FilterBar</h1>
      <form className="select_container">
        <div className="multiselect">
          <div class="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            {countriesArr.map((elt) => {
              return (
                <li><input type="checkbox" id="one" onChange={showCheckboxes} value={elt.name_en} />{elt.name_en}</li>
              )
            })}
          </div>
        </div>
      </form>
      <form className="select_container">
        <div className="multiselect">
          <div class="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            {sportsSet.map((elt) => {
              return (
                <li><input type="checkbox" id="one" onChange={showCheckboxes} value={elt} />{elt}</li>
              )
            })}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FilterBar;

