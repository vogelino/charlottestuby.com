import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import MainTitle from '../atoms/MainTitle'

const Header = ({ loading }) => (
	<header>
		<MainTitle>
			<Link className="logo" href="/" title="Homepage">
				Charlotte Stuby
			</Link>
			<div className={`loading-container ${loading ? 'loading' : ''}`} />
		</MainTitle>
	</header>
)

Header.propTypes = {
	loading: PropTypes.bool.isRequired,
}

export default Header
