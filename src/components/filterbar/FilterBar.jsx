// Infrastructure
import { Fragment } from "react";
// Styling
import "./FilterBar.scss";

const FilterBar = ({ leagues, countries }) => {

  const countriesArr = countries.countries;
  const leaguesArr = leagues.leagues;

  const sportsArray = leaguesArr.map(elt => {
    return (elt.strSport)
  });

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
          <div className="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            {countriesArr.map((elt) => {
              return (
                <li key={elt.name_en}><input type="checkbox" value={elt.name_en} />{elt.name_en}</li>
              )
            })}
          </div>
        </div>
      </form>
      <form className="select_container">
        <div className="multiselect">
          <div className="selectBox" onClick={showCheckboxes}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes">
            {sportsSet.map((elt) => {
              return (
                <li key={elt}><input type="checkbox" value={elt} />{elt}</li>
              )
            })}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FilterBar;