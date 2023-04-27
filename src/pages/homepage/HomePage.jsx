// Infrastructure
import { Fragment } from 'react';
// Components
import SportsList from '../../components/sportslist/SportsList';
// Styling
import './HomePage.scss';

const HomePage = () => {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <SportsList />
    </Fragment>
  )
}

export default HomePage;