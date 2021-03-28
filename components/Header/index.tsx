import { FC } from 'react'
import Link from '../Link'
import MainTitle from '../MainTitle'

const Header: FC = () => (
	<header>
		<MainTitle>
			<Link className="logo" href="/">
				Charlotte Stuby
			</Link>
		</MainTitle>
	</header>
)

Header.propTypes = {}

export default Header
