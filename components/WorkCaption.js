import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import ListElement from './ListElement'

const WorkCaption = ({ title, subtitle, slug, startLoading }) => (
	<ListElement className="work-caption">
		<h2>
			<button onClick={startLoading}>
				<Link href={slug} title={`${title} - ${subtitle}`} className="interactive">
					{title}
				</Link>
			</button>
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
