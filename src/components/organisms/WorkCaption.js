import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import ListElement from '../atoms/ListElement'

const WorkCaption = ({ title, subtitle, slug, startLoading }) => (
	<ListElement className="work-caption">
		<h2>
			<span onClick={startLoading}>
				<Link
					href={slug}
					title={`${title} - ${subtitle}`}
					className="interactive"
				>
					{title}
				</Link>
			</span>
		</h2>
		<h3>{subtitle}</h3>
	</ListElement>
)

WorkCaption.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	startLoading: PropTypes.func.isRequired,
}

export default WorkCaption
