// Infrastructure
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/navbar/Navbar';
import randomStadiumImgUrl from '../../assets/img/random_stadium.png'

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
					<div className="stadium_img">
						{detail.strStadiumThumb ? (
							<img src={detail.strStadiumThumb} alt={detail.strStadium} />
						) : (
							<img src={randomStadiumImgUrl} alt="Random Stadium" />
						)}
					</div>
				</section>
				<section className='competitions_section'>
					<div>
						<p>COMPETITIONS</p>
					</div>
					<div>
						{detail.strLeague && <h3>{detail.strLeague === detail.strLeague.toUpperCase() ? detail.strLeague : detail.strLeague.toUpperCase()}</h3>}
						{detail.strLeague2 && <h3>{detail.strLeague2 === detail.strLeague2.toUpperCase() ? detail.strLeague2 : detail.strLeague2.toUpperCase()}</h3>}
						{detail.strLeague3 && <h3>{detail.strLeague3 === detail.strLeague3.toUpperCase() ? detail.strLeague3 : detail.strLeague3.toUpperCase()}</h3>}
						{detail.strLeague4 && <h3>{detail.strLeague4 === detail.strLeague4.toUpperCase() ? detail.strLeague4 : detail.strLeague3.toUpperCase()}</h3>}
						{detail.strLeague5 && <h3>{detail.strLeague5 === detail.strLeague5.toUpperCase() ? detail.strLeague3 : detail.strLeague5.toUpperCase()}</h3>}
						{detail.strLeague6 && <h3>{detail.strLeague6 === detail.strLeague6.toUpperCase() ? detail.strLeague6 : detail.strLeague6.toUpperCase()}</h3>}
						{detail.strLeague7 && <h3>{detail.strLeague7 === detail.strLeague7.toUpperCase() ? detail.strLeague3 : detail.strLeague7.toUpperCase()}</h3>}
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
					<section className='stadium_flex'>
						<div>
							<p>{detail.strStadiumDescription}</p>
						</div>
						<div className='capacity_section'>
							<h3>{detail.strStadium.toUpperCase()}</h3>
							<p>Home</p>
							<h3>{detail.intStadiumCapacity}</h3>
							<p>Capacity</p>
						</div>
					</section>
				</section>
				<footer className='details_footer_section' >

					{detail.strWebsite !== "" && (
						<a href={'https://' + detail.strWebsite} target='_blank' className='underline' >WEBSITE</a>
					)}
					{detail.strTwitter !== "" && (
						<a href={'https://' + detail.strTwitter} target='_blank' className='underline' >TWITTER</a>
					)}
					{detail.strInstagram !== "" && (
						<a href={'https://' + detail.strInstagram} target='_blank' className='underline' >INSTAGRAM</a>
					)}
					{detail.strYoutube !== "" && (
						<a href={'https://' + detail.strYoutube} target='_blank' className='underline' >YOUTUBE</a>
					)}
					{detail.strFacebook !== "" && (
						<a href={'https://' + detail.strFacebook} target='_blank' className='underline' >FACEBOOK</a>
					)}
				</footer>
			</section>
		</Fragment>
	)
}

export default DetailsPage;