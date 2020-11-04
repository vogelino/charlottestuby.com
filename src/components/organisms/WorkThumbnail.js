import React from 'react'
import PropTypes from 'prop-types'
import Image from '../atoms/Img'
import Link from '../atoms/Link'

const WorkThumbnail = ({ thumbnail, title, slug }) => (
	<Link href={slug} className="work-thumbnail" title={title}>
		<div className="work-thumb-wrapper">
			<Image fluid={thumbnail.fluid} />
		</div>
	</Link>
)

WorkThumbnail.propTypes = {
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	thumbnail: PropTypes.shape({ fluid: PropTypes.object.isRequired })
		.isRequired,
}

export default WorkThumbnail
