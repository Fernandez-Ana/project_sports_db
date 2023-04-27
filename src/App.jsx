//Infrastructure
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
import HomePage from './pages/homepage/HomePage';
import LeaguePage from './pages/leaguepage/LeaguePage';
import DetailsPage from './pages/detailspage/DetailsPage';
// Styling
import './App.scss';

function App() {

  const {}


  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/leaguepage' element={<LeaguePage />} />
        <Route path='/:detailspage' element={<DetailsPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
