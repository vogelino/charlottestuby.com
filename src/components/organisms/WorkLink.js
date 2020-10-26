import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import Icon from '../atoms/Icon'
import Image from '../atoms/Img'

const WorkLink = ({ title, slug, thumbnail }) => (
	<Link href={slug} title={title} className="work-link">
		<div className="work-link-image">
			{typeof thumbnail === 'string' ? (
				<Image relativePath={thumbnail} />
			) : (
				<Image fixed={thumbnail.fixed} />
			)}
		</div>
		<div className="work-link-content">
			<h3>{title}</h3>
			<Icon iconId="arrow-right" />
			<Icon iconId="arrow-left" />
		</div>
	</Link>
)

WorkLink.propTypes = {
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	thumbnail: PropTypes.oneOfType([
		PropTypes.shape({
			fixed: PropTypes.object.isRequired,
		}),
		PropTypes.string,
	]).isRequired,
}

export default WorkLink
