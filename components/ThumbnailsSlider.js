import Slider from 'nuka-carousel'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThumbnailsSlider extends Component {
	constructor(props) {
		super(props)

		this.loaded = false

		this.getSlider = this.getSlider.bind(this)
	}

	componentDidMount() {
		this.loaded = true
		this.forceUpdate()
	}

	getSlider() {
		const {
			children,
			className,
			setCurrentWorksSlide,
			setWorksSliderDragState,
			currentSlideIndex,
		} = this.props
		const sliderConfig = {
			autoplay: false,
			decorators: [],
			dragging: true,
			data: () => {
				setWorksSliderDragState(true)
			},
			afterSlide: setCurrentWorksSlide,
			slideIndex: currentSlideIndex,
			initialSlideHeight: 500,
			initialSlideWidth: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			className,
			renderTopCenterControls: () => null,
			renderCenterLeftControls: () => null,
			renderCenterRightControls: () => null,
			renderBottomCenterControls: () => null,
		}
		return <Slider {...sliderConfig}>{children}</Slider>
	}

	render() {
		const { children, className } = this.props
		return this.loaded ? this.getSlider() : <div className={className}>{children}</div>
	}
}

ThumbnailsSlider.mixins = [Slider.ControllerMixin]

ThumbnailsSlider.propTypes = {
	children: PropTypes.array.isRequired,
	className: PropTypes.string,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	setWorksSliderDragState: PropTypes.func.isRequired,
	currentSlideIndex: PropTypes.number.isRequired,
}

export default ThumbnailsSlider
