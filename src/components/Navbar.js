import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Navbar = ({ page = '' }) => (
	<nav role="navigation" aria-label="main-navigation">
		<ul>
			<li className="about">
				<Link to="/about" className={page === 'about' ? 'active' : ''}>
					About
				</Link>
			</li>
			<li className="work">
				<Link to="/work" className={page === '' ? 'active' : ''}>
					Works
				</Link>
			</li>
		</ul>
	</nav>
)

Navbar.propTypes = {
	page: PropTypes.string.isRequired,
}

export default Navbar
