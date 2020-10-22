import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GatsbyImage from 'gatsby-image'

const MAX_CLICK_DURATION = 100

class WorkThumbnail extends Component {
	constructor(props) {
		super(props)

		this.pressedImageStartTime = 0
	}
	setPressedImageTime(time) {
		this.pressedImageStartTime = time
	}
	openWork(slug, time) {
		const clickDuration = time - this.pressedImageStartTime
		if (clickDuration < MAX_CLICK_DURATION) {
			this.props.startLoading()
			this.props.onClick(slug)
		}
		this.pressedImageStartTime = 0
	}
	render() {
		const { slug, thumbnail } = this.props
		return (
			<div
				onMouseDown={(e) => this.setPressedImageTime(e.timeStamp)}
				onMouseUp={(e) => this.openWork(slug, e.timeStamp)}
				className="work-thumbnail"
			>
				<div className="work-thumb-wrapper">
					<GatsbyImage fluid={thumbnail.fluid} />
				</div>
			</div>
		)
	}
}

WorkThumbnail.propTypes = {
	slug: PropTypes.string.isRequired,
	thumbnail: PropTypes.shape({ fluid: PropTypes.object.isRequired })
		.isRequired,
	startLoading: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default WorkThumbnail
