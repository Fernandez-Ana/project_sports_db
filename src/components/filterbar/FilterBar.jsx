// Infrastructure
import { useState } from "react";
// Styling
import "./FilterBar.scss";

const FilterBar = ({ leagues, countries }) => {

  // State for display and hide dropdown menu
  const [expanded, setExpanded] = useState(false);
  // State for selected checkboxes of dropdown menu
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const countriesArr = countries.countries;
  const leaguesArr = leagues.leagues;

  const sportsArray = leaguesArr.map(elt => {
    return (elt.strSport)
  });

  const sportsSet = [...new Set(sportsArray)];

  // Function to show checkboxes when selected and hide when deselected
  function showCheckboxes(selectBox) {
    console.log(selectBox);
    const checkboxes = document.getElementById("checkboxes-" + selectBox);
    if (!expanded) {
      checkboxes.style.display = "block";
      setExpanded(true);
    } else {
      checkboxes.style.display = "none";
      setExpanded(false);
    }
  }

  // Function to get values of selected checkboxes
  function getValuesCountries(e) {
    if (e.target.checked) {
    setSelectedCheckboxes([...selectedCheckboxes, e.target.value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(elt => elt !== e.target.value));
    }
  }

  return (
    <div className='flex-container'>
      {selectedCheckboxes.length > 0 && selectedCheckboxes.map((elt) => {
        return (
          <div className='selected-element' key={elt}>X {elt}</div>
        )
      })}
      <form className="select_container">
        {/* <div className="multiselect"> */}
          <div className="selectBox" onClick={() => showCheckboxes("countries")}>
            <select>
              <option>All Countries</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {!expanded && <div id="checkboxes-countries" className="checkboxes">
            {countriesArr.map((elt) => {
              return (
                <li
                  key={elt.name_en}
                  className='list-element'>
                    <label>{elt.name_en}
                      <input
                        type="checkbox"
                        value={elt.name_en}
                        onChange={getValuesCountries} />
                    </label>
                </li>
              )
            })}
          </div>}
        {/* </div> */}
      </form>
      <form className="select_container">
        <div className="multiselect">
          <div className="selectBox" onClick={() => showCheckboxes("sports")}>
            <select>
              <option>All Sports</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id="checkboxes-sports" className="checkboxes">
            {!expanded && <div id="checkboxes-sports" className="checkboxes">
              {sportsSet.map((elt) => {
                return (
                  <li key={elt} className='list-element'><input type="checkbox" value={elt} />{elt}</li>
                )
              })}
            </div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;