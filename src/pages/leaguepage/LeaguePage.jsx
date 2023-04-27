// Infrastructure
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
// Styling
import './LeaguePage.scss';

const LeaguePage = () => {
  return (
    <Fragment>
      <h1>League Page</h1>
      <Link to='/:detailspage'>Details Page</Link>
    </Fragment>
  )
}

export default LeaguePage;