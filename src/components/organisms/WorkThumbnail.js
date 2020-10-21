import React, { Component } from 'react'
import PropTypes from 'prop-types'

const MAX_CLICK_DURATION = 250

const getThumpnailImage = (url, orientation) => {
	const backgroundImage = `url('${url}')`
	return <figure className={orientation} style={{ backgroundImage }} />
}

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
			this.props.navigateTo(`/work/${slug}`)
		}
		this.pressedImageStartTime = 0
	}
	render() {
		const { slug, landscapeThumb, portraitThumb } = this.props
		return (
			<div
				onMouseDown={(e) => this.setPressedImageTime(e.timeStamp)}
				onMouseUp={(e) => this.openWork(slug, e.timeStamp)}
				className="work-thumbnail"
			>
				<div className="work-thumb-wrapper">
					{getThumpnailImage(landscapeThumb, 'landscape')}
					{getThumpnailImage(portraitThumb, 'portrait')}
				</div>
			</div>
		)
	}
}

WorkThumbnail.propTypes = {
	slug: PropTypes.string.isRequired,
	landscapeThumb: PropTypes.string.isRequired,
	portraitThumb: PropTypes.string.isRequired,
	startLoading: PropTypes.func.isRequired,
	navigateTo: PropTypes.func.isRequired,
}

export default WorkThumbnail
