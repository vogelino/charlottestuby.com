import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from './Link'

const WorkThumbnail = ({ thumbnail, title, slug }) => (
	<Link href={`/work/${slug}`} className="work-thumbnail" title={title}>
		<div className="work-thumb-wrapper">
			<Image src={thumbnail} layout="fill" objectFit="cover" />
		</div>
	</Link>
)

WorkThumbnail.propTypes = {
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
}

export default WorkThumbnail
