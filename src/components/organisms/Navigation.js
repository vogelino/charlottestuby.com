import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import List from '../atoms/List'
import ListElement from '../atoms/ListElement'

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
					<span onClick={startLoading}>
						<Link href={page.path} title={page.name}>
							{page.name}
						</Link>
					</span>
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
