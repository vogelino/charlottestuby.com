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
			worksSlider,
			ui,
		} = this.props
		const {
			bodyMinHeight,
			captionHeight,
			headerHeight,
			innerHeight,
			innerWidth,
		} = ui
		const height =
			ui.height < bodyMinHeight
				? bodyMinHeight - headerHeight - captionHeight
				: innerHeight - captionHeight
		const sliderConfig = {
			autoplay: false,
			decorators: [],
			dragging: true,
			data: () => {
				setWorksSliderDragState(true)
			},
			afterSlide: setCurrentWorksSlide,
			slideIndex: worksSlider.currentSlide,
			initialSlideHeight: parseInt(height, 10),
			initialSlideWidth: parseInt(innerWidth, 10),
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
		return this.loaded ? (
			this.getSlider()
		) : (
			<div className={className}>{children}</div>
		)
	}
}

ThumbnailsSlider.mixins = [Slider.ControllerMixin]

ThumbnailsSlider.propTypes = {
	children: PropTypes.array.isRequired,
	className: PropTypes.string,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	setWorksSliderDragState: PropTypes.func.isRequired,
	worksSlider: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
}

export default ThumbnailsSlider
