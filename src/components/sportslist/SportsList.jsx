// Infrastructure
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
// Styling
import './SportsList.scss';

const SportsList = (props) => {

  console.log(props.leagues);

  return (
    <Fragment>
      <Link to='/leaguepage'>League Page</Link>
    </Fragment>
  )
}

export default SportsList;