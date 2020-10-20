import React from 'react'
import { Link } from 'gatsby'

class Navbar extends React.Component {
	render() {
		return (
			<nav role="navigation" aria-label="main-navigation">
				<Link to="/" title="Logo">
					Charlotte Stuby
				</Link>
				<Link to="/about">About</Link>
				<Link to="/work">Works</Link>
			</nav>
		)
	}
}

export default Navbar
