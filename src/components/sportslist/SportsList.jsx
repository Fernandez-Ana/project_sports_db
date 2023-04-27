// Infrastructure
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
// Styling
import './SportsList.scss';
// Components
import FilterBar from '../filterbar/FilterBar';

const SportsList = () => {
  return (
    <Fragment>
      <Link to='/leaguepage'>League Page</Link>
      <FilterBar />
    </Fragment>
  )
}

export default SportsList;