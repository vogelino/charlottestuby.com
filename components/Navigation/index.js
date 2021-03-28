import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'

const Navigation = ({ page = '', isPreview = false }) => (
	<nav role="navigation" aria-label="main-navigation">
		<ul>
			<li className="press">
				<Link
					href={isPreview ? '#' : '/press'}
					className={page === 'press' ? 'active' : ''}
					title="Read about Charlotte Stuby and her work in the press"
				>
					Press
				</Link>
			</li>
			<li className="work">
				<Link
					href={isPreview ? '#' : '/'}
					className={page === '' ? 'active' : ''}
					title="Discover Charlotte Stuby's artworks, exhibits and projectsw"
				>
					Works
				</Link>
			</li>
			<li className="about">
				<Link
					href={isPreview ? '#' : '/about'}
					className={page === 'about' ? 'active' : ''}
					title="About Charlotte and her work"
				>
					About
				</Link>
			</li>
		</ul>
	</nav>
)

Navigation.propTypes = {
	page: PropTypes.string.isRequired,
	isPreview: PropTypes.bool,
}

export default Navigation
