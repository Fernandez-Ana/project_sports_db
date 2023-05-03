// Infrastructure
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styling
import './NavBar.scss';
import logo from '../../assets/img/logo.svg';
import search from '../../assets/img/search.svg';

const NavBar = (props) => {

	const handleChange = (event) => {
		props.setLeagueSearch(event.target.value)
	};

	return (
		<Fragment>
			<nav className='navContainer' id='nav'>
				<div className='logoContainer'>
					<img src={logo} alt='sports_db_logo' />
					<Link to='/'>
						<h1>Sports.db</h1>
					</Link>
				</div>
				<div className='searchContainer'>
					<img src={search} alt='' />
					<input type='text' name='' id='' onChange={handleChange} />
				</div>
			</nav>
		</Fragment>
	);
};

export default NavBar;
