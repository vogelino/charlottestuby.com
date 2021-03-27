import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import List from './List'
import ListElement from './ListElement'

const getNavLinkClass = (pagePath, pathname) => {
	if (pathname === '/' && pagePath === '/works') {
		return 'active'
	}
	return pathname === pagePath ? 'active' : ''
}

const Navigation = ({ pages, pathname, startLoading }) => (
	<nav>
		<List>
			{pages.map((page) => (
				<ListElement
					className={`
						${page.name.toLowerCase()}
						${getNavLinkClass(page.path.toLowerCase(), pathname)}
					`}
					key={page.name.toLowerCase()}
				>
					<button onClick={startLoading}>
						<Link href={page.path} title={page.name}>
							{page.name}
						</Link>
					</button>
				</ListElement>
			))}
		</List>
	</nav>
)

Navigation.propTypes = {
	pathname: PropTypes.string.isRequired,
	pages: PropTypes.array.isRequired,
	startLoading: PropTypes.func.isRequired,
}

export default Navigation
