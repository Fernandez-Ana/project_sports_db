// Infrastructure
import { useState, useEffect, useRef } from 'react';
// Styling
import './FilterBar.scss';
import { FiX } from "react-icons/fi";

const FilterBar = ({ leagues, onFilterData, onFilterEmpty }) => {
  // Different states for display and hide dropdown menu
  const [countriesExpanded, setCountriesExpanded] = useState(false);
  const [sportsExpanded, setSportsExpanded] = useState(false);
  // States for selected checkboxes of dropdown menus
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  // Arrays for dropdown menus and sorting them alphabetically
  const countriesArr = leagues.map(elt => elt.strCountry).sort((x, y) => x > y ? 1 : -1,);
  const countriesSet = [...new Set(countriesArr)];

  const sportsArr = leagues.map(elt => elt.strSport).sort((x, y) => x > y ? 1 : -1,);
  const sportsSet = [...new Set(sportsArr)];

  // Function to show checkboxes when selected and hide when deselected
  function showCheckboxes(selectBox) {
    // Get checkboxes element according to the selected dropdown menu
    const checkboxes = document.querySelector('.checkboxes-wrapper-' + selectBox);

    // Switch statement to check which dropdown menu is selected and execute accordingly
    switch (selectBox) {
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
      onFilterEmpty(false);
    } else {
      setSelectedCountries(selectedCountries.filter(elt => elt !== e.target.value));
    }
  }

  // Function to get values of selected checkboxes of sports
  function getSportValues(e) {
    if (e.target.checked) {
      setSelectedSports([...selectedSports, e.target.value]);
      onFilterEmpty(false);
    } else {
      setSelectedSports(selectedSports.filter(elt => elt !== e.target.value));
    }
  }

  // Function to pass data to parent component and trigger a new API call with the selected filters
  useEffect(() => {
    if (selectedCountries.length === 0 && selectedSports.length > 0) {
      onFilterData(countriesSet, selectedSports);
    } else if (selectedCountries.length > 0 && selectedSports.length === 0) {
      onFilterData(selectedCountries, sportsSet);
    } else if (selectedCountries.length > 0 && selectedSports.length > 0) {
      onFilterData(selectedCountries, selectedSports);
    } else if (selectedCountries.length === 0 && selectedSports.length === 0) {
      onFilterEmpty(true);
    }
  }, [selectedCountries, selectedSports]);

  // Function to close dropdown menus when clicking outside of them
  const countriesWrapperRef = useRef(null);
  const sportsWrapperRef = useRef(null);

  const handleClickOutside = (event) => {

    const isSelectingElement = event.target.classList.contains("overSelect") ||
    event.target.parentNode.classList.contains("overSelect");

    if (
      countriesExpanded &&
      countriesWrapperRef.current &&
      !countriesWrapperRef.current.contains(event.target) &&
      !isSelectingElement
    ) {
      showCheckboxes('countries');
    }
    if (
      sportsExpanded &&
      sportsWrapperRef.current &&
      !sportsWrapperRef.current.contains(event.target) &&
      !isSelectingElement
    ) {
      showCheckboxes('sports');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [countriesExpanded, sportsExpanded]);

  return (
    <div className='flex-container'>
      <div className='flex-container-buttons'>
        <div className='flex-container-selected-elements-countries'>
          {selectedCountries.length > 0 && selectedCountries.map((elt) => {
            return (
              <button
                type='button'
                className='selected-element'
                value={elt}
                key={elt}
                onClick={closeButton}>
                <FiX size={16} style={{ pointerEvents: 'none' }} />{elt}
              </button>
            )
          })}
        </div>
        <div className='flex-container-selected-elements-sports'>
          {selectedSports.length > 0 && selectedSports.map((elt) => {
            return (
              <button
                type='button'
                className='selected-element'
                value={elt}
                key={elt}
                onClick={closeButton}>
                <FiX size={16} style={{ pointerEvents: 'none' }} />{elt}
              </button>
            )
          })}
        </div>
      </div>
      <div className='flex-container-filter'>
        <form className='select-container'>
          <div className='selectBox' onClick={(event) => showCheckboxes('countries')}>
            <select className='selecting'>
              <option>All Countries</option>
            </select>
            <div className='overSelect'></div>
          </div>
          <div className='checkboxes-wrapper-countries' ref={countriesWrapperRef}>
            {countriesExpanded && <div className='checkboxes checkboxes-countries'>
              {countriesSet.map(country => {
                return (
                  <li
                    key={country}
                    className='list-element-dropdown'>
                    <label>
                      <input
                        type='checkbox'
                        value={country}
                        checked={selectedCountries.includes(country)}
                        onChange={getCountryValues} />
                      {country}
                    </label>
                  </li>
                )
              })}
            </div>}
          </div>
        </form>
        <form className='select-container'>
          <div className='multiselect'>
            <div className='selectBox' onClick={() => showCheckboxes('sports')}>
              <select className='selecting'>
                <option>All Sports</option>
              </select>
              <div className='overSelect'></div>
            </div>
            <div className='checkboxes-wrapper-sports' ref={sportsWrapperRef}>
              {sportsExpanded && <div className='checkboxes checkboxes-sports'>
                {sportsSet.map((elt) => {
                  return (
                    <li
                      key={elt}
                      className='list-element-dropdown'>
                      <label className='checkbox-value'>
                        <input
                          type='checkbox'
                          value={elt}
                          checked={selectedSports.includes(elt)}
                          onChange={getSportValues} />
                        {elt}
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