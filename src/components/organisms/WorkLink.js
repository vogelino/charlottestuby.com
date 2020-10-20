import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import Icon from '../atoms/Icon'

const WorkLink = ({ title, subtitle, slug, landscapeThumb }) => (
	<Link href={`/work?slug=${slug}`} title={title} className="work-link">
		<div
			className="work-link-image"
			style={{ backgroundImage: `url(${landscapeThumb.url})` }}
		/>
		<div className="work-link-content">
			<h3>{title}</h3>
			<h4>{subtitle}</h4>
			<Icon iconId="arrow-right" />
			<Icon iconId="arrow-left" />
		</div>
	</Link>
)

WorkLink.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	landscapeThumb: PropTypes.shape({ url: PropTypes.string }).isRequired,
}

export default WorkLink
