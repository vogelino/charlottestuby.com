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
			this.props.navigateTo(`/work?slug=${slug}`)
		}
		this.pressedImageStartTime = 0
	}
	render() {
		const { slug, landscapeThumb, portraitThumb, ui } = this.props
		return (
			<div
				onMouseDown={(e) => this.setPressedImageTime(e.timeStamp)}
				onMouseUp={(e) => this.openWork(slug, e.timeStamp)}
				className="work-thumbnail"
				style={{
					height: ui.innerHeight - ui.captionHeight,
				}}
			>
				<div className="work-thumb-wrapper">
					{getThumpnailImage(landscapeThumb.url, 'landscape')}
					{getThumpnailImage(portraitThumb.url, 'portrait')}
				</div>
			</div>
		)
	}
}

const ImagePropTypes = { url: PropTypes.string }

WorkThumbnail.propTypes = {
	slug: PropTypes.string.isRequired,
	landscapeThumb: PropTypes.shape(ImagePropTypes).isRequired,
	portraitThumb: PropTypes.shape(ImagePropTypes).isRequired,
	ui: PropTypes.object.isRequired,
	startLoading: PropTypes.func.isRequired,
	navigateTo: PropTypes.func.isRequired,
}

export default WorkThumbnail
