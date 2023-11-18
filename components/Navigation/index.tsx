import { FC } from 'react'
import Link from '../Link'

interface NavigationType {
	page?: string
	isPreview?: boolean
}

const Navigation: FC<NavigationType> = ({ page = '', isPreview = false }) => (
	<nav role="navigation" aria-label="main-navigation" className="main-nav">
		<ul>
			<li className="about">
				<Link href={isPreview ? '#' : '/about'} className={page === 'about' ? 'active' : ''}>
					<span>About</span>
				</Link>
			</li>
			<li className="work">
				<Link href={isPreview ? '#' : '/'} className={page === '' ? 'active' : ''}>
					<span>Works</span>
				</Link>
			</li>
			<li className="press">
				<Link href={isPreview ? '#' : '/press'} className={page === 'press' ? 'active' : ''}>
					<span>Press</span>
				</Link>
			</li>
			<li className="stuby-and-fischer">
				<Link
					href={isPreview ? '#' : '/stuby-and-fischer'}
					className={page === 'stuby-and-fischer' ? 'active' : ''}
				>
					<span className="lg">Stuby &amp; Fischer</span>
					<span className="sm">S &amp; F</span>
				</Link>
			</li>
		</ul>
	</nav>
)

export default Navigation
