import { FC } from 'react'
import Link from '../Link'

interface NavigationType {
	page?: string
	isPreview?: boolean
}

const Navigation: FC<NavigationType> = ({ page = '', isPreview = false }) => (
	<nav role="navigation" aria-label="main-navigation" className="main-nav">
		<ul>
			<li className="press">
				<Link
					href={isPreview ? '#' : '/press'}
					className={page === 'press' ? 'active' : ''}
				>
					Press
				</Link>
			</li>
			<li className="work">
				<Link href={isPreview ? '#' : '/'} className={page === '' ? 'active' : ''}>
					Works
				</Link>
			</li>
			<li className="about">
				<Link
					href={isPreview ? '#' : '/about'}
					className={page === 'about' ? 'active' : ''}
				>
					About
				</Link>
			</li>
		</ul>
	</nav>
)

export default Navigation
