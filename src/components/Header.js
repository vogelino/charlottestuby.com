import React from 'react'
import PropTypes from 'prop-types'
import Link from './atoms/Link'

const Header = ({ isPreview = false }) => (
	<header>
		<h1>
			<Link
				className="logo"
				href={isPreview ? '#' : '/'}
				title="Charlotte Stuby's logo"
			>
				Charlotte Stuby
			</Link>
		</h1>
	</header>
)

Header.propTypes = {
	isPreview: PropTypes.bool,
}

export default Header
