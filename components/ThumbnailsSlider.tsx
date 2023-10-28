import Slider from 'nuka-carousel'
import React, { Component, ReactNode } from 'react'

interface ThumbnailsSliderType {
	className: string
	setCurrentWorksSlide: (currentSlideIndex: number) => void
	setWorksSliderDragState?: (isBeingDragged: boolean) => void
	currentSlideIndex: number
	children: ReactNode
}

class ThumbnailsSlider extends Component<ThumbnailsSliderType> {
	loaded: boolean

	constructor(props: ThumbnailsSliderType) {
		super(props)

		this.loaded = false

		this.getSlider = this.getSlider.bind(this)
	}

	componentDidMount(): void {
		this.loaded = true
		this.forceUpdate()
	}

	getSlider(): ReactNode {
		const {
			children,
			className,
			setCurrentWorksSlide,
			setWorksSliderDragState = () => undefined,
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

	render(): ReactNode {
		const { children, className } = this.props
		return this.loaded ? this.getSlider() : <div className={className}>{children}</div>
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ThumbnailsSlider.mixins = [Slider.ControllerMixin]

export default ThumbnailsSlider
