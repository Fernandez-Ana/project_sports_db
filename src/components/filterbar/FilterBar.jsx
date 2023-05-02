// Infrastructure
import { useState, useEffect } from 'react';
// Styling
import './FilterBar.scss';
import { FiX } from "react-icons/fi";

const FilterBar = ({ leagues, countries, onFilterData }) => {

  // Different states for display and hide dropdown menu
  const [countriesExpanded, setCountriesExpanded] = useState(false);
  const [sportsExpanded, setSportsExpanded] = useState(false);
  // States for selected checkboxes of dropdown menus
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const countriesArr = countries.countries.map(country => country.name_en);
  const leaguesArr = leagues.leagues;

  const sportsArray = leaguesArr.map(elt => elt.strSport);
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

  // Function to deselect checkboxes by closing the buttons of selected checkboxes
  function closeButton(e) {
    const value = e.target.value;
    if (selectedCountries.includes(value)) {
      setSelectedCountries(selectedCountries.filter(elt => elt !== value));
    } else {
      setSelectedSports(selectedSports.filter(elt => elt !== value));
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.value === value) {
        checkbox.checked = false;
      }
    });
  }

  // Function to get values of selected checkboxes of countries
  function getCountryValues(e) {
    if (e.target.checked) {
    setSelectedCountries([...selectedCountries, e.target.value]);
    } else {
      const filteredCountries = selectedCountries.filter(elt => elt !== e.target.value);
      setSelectedCountries(filteredCountries);
    }
  }

  // Function to get values of selected checkboxes of sports
  function getSportValues(e) {
    if (e.target.checked) {
    setSelectedSports([...selectedSports, e.target.value]);
    } else {
      const filteredSports = selectedSports.filter(elt => elt !== e.target.value);
      setSelectedSports(filteredSports);
    }
  }

  useEffect(() => {
    if (selectedCountries.length === 0 && selectedSports.length > 0) {
      onFilterData( countriesArr, selectedSports );
    } else if (selectedCountries.length > 0 && selectedSports.length === 0) {
      onFilterData( selectedCountries, sportsSet );
      } else if (selectedCountries.length > 0 && selectedSports.length > 0) {
      onFilterData(selectedCountries, selectedSports);
        }

  }, [selectedCountries, selectedSports]);

  return(
    <div className='flex-container'>
      <div className='flex-container-selected-elements'>
        {selectedCountries.length > 0 && selectedCountries.map((elt) => {
          return (
            <button
              type='button'
              className='selected-element'
              value={elt}
              key={elt}
              onClick={closeButton}>
              <FiX size={16} style={{pointerEvents: 'none'}} />{elt}
            </button>
          )
        })}
        {selectedSports.length > 0 && selectedSports.map((elt) => {
          return (
            <button
              type='button'
              className='selected-element'
              value={elt}
              key={elt}
              onClick={closeButton}>
              <FiX size={16} style={{pointerEvents: 'none'}} />{elt}
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
                {countriesArr.map(country => {
                  return (
                    <li
                    key={country}
                    className='list-element'>
                        <label>{country}
                          <input
                            type='checkbox'
                            value={country}
                            checked={selectedCountries.includes(country)}
                            onChange={getCountryValues} />
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
                            checked={selectedSports.includes(elt)}
                            onChange={getSportValues} />
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