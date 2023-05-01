// Infrastructure
import { useState } from 'react';
// Styling
import './FilterBar.scss';
import { FiX } from "react-icons/fi";

const FilterBar = ({ leagues, countries }) => {

  // Different states for display and hide dropdown menu
  const [countriesExpanded, setCountriesExpanded] = useState(false);
  const [sportsExpanded, setSportsExpanded] = useState(false);
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
    // Get checkboxes element according to the selected dropdown menu
    const checkboxes = document.querySelector('.checkboxes-wrapper-' + selectBox);

    // Switch statement to check which dropdown menu is selected and execute accordingly
    switch(selectBox) {
      case 'countries':
        if (!countriesExpanded) {
          checkboxes.style.display = 'block';
          setCountriesExpanded(true);
        } else {
          checkboxes.style.display = 'none';
          setCountriesExpanded(false);
        }
        break;
      case 'sports':
        if (!sportsExpanded) {
          checkboxes.style.display = 'block';
          setSportsExpanded(true);
        } else {
          checkboxes.style.display = 'none';
          setSportsExpanded(false);
        }
        break;
      default:
        console.log('error');
    }
  }

  // Function to get values of selected checkboxes
  function getValues(e) {
    if (e.target.checked) {
    setSelectedCheckboxes([...selectedCheckboxes, e.target.value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(elt => elt !== e.target.value));
    }
  }

  // Function to deselect checkboxes by closing the buttons of selected checkboxes
  function closeButton(e) {
    setSelectedCheckboxes(selectedCheckboxes.filter(elt => elt !== e.target.value));
  }

  console.log(selectedCheckboxes);

  return(
    <div className='flex-container'>
      <div className='flex-container-selected-elements'>
        {selectedCheckboxes.length > 0 && selectedCheckboxes.map((elt) => {
          return (
            <button
              type='button'
              className='selected-element'
              value={elt}
              key={elt}
              onClick={closeButton}>
              <FiX size={20} />{elt}
            </button>
          )
        })}
      </div>
      <div className='flex-container-filter'>
        <form className='select-container'>
          {/* <div className='multiselect'> */}
            <div className='selectBox' onClick={() => showCheckboxes('countries')}>
              <select>
                <option>All Countries</option>
              </select>
              <div className='overSelect'></div>
            </div>
            <div className='checkboxes-wrapper-countries'>
              {countriesExpanded && <div className='checkboxes checkboxes-countries'>
                {countriesArr.map((elt) => {
                  return (
                    <li
                    key={elt.name_en}
                    className='list-element'>
                        <label>{elt.name_en}
                          <input
                            type='checkbox'
                            value={elt.name_en}
                            onChange={getValues} />
                        </label>
                    </li>
                  )
                })}
              </div>}
            </div>
          {/* </div> */}
        </form>
        <form className='select-container'>
          <div className='multiselect'>
            <div className='selectBox' onClick={() => showCheckboxes('sports')}>
              <select>
                <option>All Sports</option>
              </select>
              <div className='overSelect'></div>
            </div>
            <div className='checkboxes-wrapper-sports'>
              {sportsExpanded && <div className='checkboxes checkboxes-sports'>
                {sportsSet.map((elt) => {
                  return (
                    <li
                    key={elt}
                    className='list-element'>
                        <label>{elt}
                          <input
                            type='checkbox'
                            value={elt}
                            onChange={getValues} />
                        </label>
                    </li>
                  )
                })}
              </div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;