// Infrastructure
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/navbar/Navbar';
// Styling
import './DetailsPage.scss';

const DetailsPage = () => {

  // Get the location object from the router
  const location = useLocation()
  const detail = location.state

  return (
    <Fragment>
      <NavBar />
      <section className='detailspage'>
        <h2>{detail.strTeam.toUpperCase()}</h2>
        <section className='stadium_section'>
          <div className='stadium_details'>
            <h3>{detail.strCountry.toUpperCase()}</h3>
            <p>Country</p>
            <h3>{detail.strStadiumLocation.toUpperCase().slice(0, 16)}</h3>
            <p>Location</p>
            <h3>{detail.intFormedYear}</h3>
            <p>Established</p>
            <h3>{detail.strSport.toUpperCase()}</h3>
            <p>Sport</p>
          </div>
          <div className='stadium_img'>
            <img src={detail.strStadiumThumb} alt={detail.strStadium} />
          </div>
        </section>
        <section className='competitions_section'>
          <div>
            <p>COMPETITIONS</p>
          </div>
          <div>
            <h3>{detail.strLeague.toUpperCase()}</h3>
            <h3>{detail.strLeague2.toUpperCase()}</h3>
            <h3>{detail.strLeague3.toUpperCase()}</h3>
            <h3>{detail.strLeague4.toUpperCase()}</h3>
            <h3>{detail.strLeague5.toUpperCase()}</h3>
            <h3>{detail.strLeague6.toUpperCase()}</h3>
            <h3>{detail.strLeague7.toUpperCase()}</h3>
          </div>
        </section>
        <section className='team_description_section'>
          <div>
            <p>DESCRIPTION</p>
          </div>
          <div>
            <p>{detail.strDescriptionEN}</p>
          </div>

        </section>
        <section className='badge_img'>
          <div><img src={detail.strTeamBadge} alt={detail.strTeam} /></div>
        </section>
        <section className='stadium_description_section'>
          <div className='headline_stadium'>
            <h3>STADIUM</h3>
          </div>
          <section>
            <div>
              <p>{detail.strStadiumDescription}</p>
            </div>
            <div>
              <h3>{detail.strStadium.toUpperCase()}</h3>
              <p>Home</p>
              <h3>{detail.intStadiumCapacity}</h3>
              <p>Capacity</p>
            </div>
          </section>
        </section>
        <footer>

        </footer>
      </section>
    </Fragment>
  )
}

export default DetailsPage;