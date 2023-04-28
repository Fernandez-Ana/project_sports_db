// Infrastructure
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
// Styling
import './DetailsPage.scss';

const DetailsPage = () => {

  // Get the location object from the router
  const location = useLocation()

  return (
    <Fragment>
      <h1>Details Page</h1>
      <p>{location.state.strTeam}</p>
    </Fragment>
  )
}

export default DetailsPage;