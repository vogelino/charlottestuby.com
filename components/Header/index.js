import React from 'react'
import Link from '../Link'
import MainTitle from '../MainTitle'

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
