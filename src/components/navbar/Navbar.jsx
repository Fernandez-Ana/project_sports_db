// Infrastructure
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// Styling
import './NavBar.scss';
import logo from '../../assets/img/logo.svg';
import search from '../../assets/img/search.svg';

const NavBar = (props) => {

  const [isInputFocused, setIsInputFocused] = useState(false);

	const handleChange = (event) => {
		props.setLeagueSearch(event.target.value)
	};

  const handleFocusBlur = (event) => {
    console.log(event.type);
    if (event.type === "focus") {
      setIsInputFocused(true);
    } else if (event.type === "blur" && event.target.value === "") {
      setIsInputFocused(false);
    }
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
				<div className={`searchContainer${isInputFocused ? " input-focused" : ""}`}>
					<img src={search} alt='' />
					<input
            type='text'
            name=''
            id=''
            onChange={handleChange}
            onFocus={handleFocusBlur}
            onBlur={handleFocusBlur} />
				</div>
			</nav>
		</Fragment>
	);
};

export default NavBar;
