// Infrastructure
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styling
import "./NavBar.scss";
import logo from "../../assets/img/logo.svg";
// import search from "../../assets/img/search.svg";

const NavBar = () => {


	// const handleChange = (event) => {
	// 	// props.setSport(event.target.value)
	// 	console.log(event.target.value);
	// };

	return (
		<Fragment>
			<nav>
				<div className="logo_container">
					<img src={logo} alt="sports_db_logo" />
					<Link to="/">
						<h1>Sports.db</h1>
					</Link>
				</div>
				{/* <img src={search} alt='' /> */}
				{/* <input type="text" name="" id="" onChange={handleChange} /> */}
			</nav>
		</Fragment>
	);
};

export default NavBar;
