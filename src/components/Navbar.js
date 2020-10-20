import React from 'react'
import { Link } from 'gatsby'

class Navbar extends React.Component {
	render() {
		return (
			<nav role="navigation" aria-label="main-navigation">
				<ul>
					<li>
						<Link to="/about">About</Link>
						<Link to="/work">Works</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Navbar
