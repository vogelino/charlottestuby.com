import React from 'react'
import Link from '../atoms/Link'
import MainTitle from '../atoms/MainTitle'

const Header = () => (
	<header>
		<MainTitle>
			<Link className="logo" href="/" title="Homepage">
				Charlotte Stuby
			</Link>
		</MainTitle>
	</header>
)

Header.propTypes = {}

export default Header
