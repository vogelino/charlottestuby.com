import React from 'react'
import PropTypes from 'prop-types'
import Link from './atoms/Link'

const Navbar = ({ page = '', isPreview = false }) => (
	<nav role="navigation" aria-label="main-navigation">
		<ul>
			<li className="about">
				<Link
					href={isPreview ? '#' : '/about'}
					className={page === 'about' ? 'active' : ''}
				>
					About
				</Link>
			</li>
			<li className="work">
				<Link
					href={isPreview ? '#' : '/'}
					className={page === '' ? 'active' : ''}
				>
					Works
				</Link>
			</li>
		</ul>
	</nav>
)

Navbar.propTypes = {
	page: PropTypes.string.isRequired,
	isPreview: PropTypes.bool,
}

export default Navbar
