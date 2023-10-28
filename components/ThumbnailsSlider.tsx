import { Splide, SplideTrack } from '@splidejs/react-splide'
import React, { FC, ReactNode, useEffect, useRef } from 'react'

interface ThumbnailsSliderType {
	className: string
	setCurrentWorksSlide: (currentSlideIndex: number) => void
	setWorksSliderDragState?: (isBeingDragged: boolean) => void
	currentSlideIndex: number
	children: ReactNode
}

const ThumbnailsSlider: FC<ThumbnailsSliderType> = ({
	className,
	setCurrentWorksSlide,
	setWorksSliderDragState = () => undefined,
	currentSlideIndex,
	children,
}) => {
	const slider = useRef<Splide>(null)

	useEffect(() => {
		slider.current?.go(currentSlideIndex)
	}, [currentSlideIndex])

	return (
		<Splide
			ref={slider}
			hasTrack={false}
			className={className}
			options={{
				type: 'slide',
				rewind: false,
				perPage: 1,
				perMove: 1,
				direction: 'ttb',
				height: '100vh',
				width: '100vw',
				gap: 0,
				pagination: false,
				arrows: false,
				drag: true,
				cover: true,
				autoplay: false,
				start: currentSlideIndex,
			}}
			onDrag={() => setWorksSliderDragState(true)}
			onUpdated={(splide) => setCurrentWorksSlide(splide.index)}
		>
			<SplideTrack>{children}</SplideTrack>
		</Splide>
	)
}

export default ThumbnailsSlider
