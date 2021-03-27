import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import Icon from './Icon'
import Image from 'next/image'

const WorkLink = ({ title, slug, thumbnail }) => (
	<Link href={`/work/${slug}`} title={title} className="work-link">
		<div className="work-link-image">
			<Image src={thumbnail} width="60" height="60" layout="fixed" objectFit="cover" />
		</div>
		<div className="work-link-content">
			<h3>{title}</h3>
			<Icon iconId="arrow-right" />
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
