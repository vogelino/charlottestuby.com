import React from 'react'
import { Link } from 'gatsby'

class Navbar extends React.Component {
	render() {
		return (
			<nav role="navigation" aria-label="main-navigation">
				<ul>
					<li className="about">
						<Link to="/about">About</Link>
					</li>
					<li className="work">
						<Link aria-current="page" to="/work">
							Works
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Navbar
