import { Splide, SplideTrack } from '@splidejs/react-splide'
import React, { FC, ReactNode, useEffect, useRef } from 'react'

interface ThumbnailsSliderType {
	className: string
	onSlideUpdate: (currentSlideIndex: number) => void
	currentSlideIndex: number
	children: ReactNode
}

const ThumbnailsSlider: FC<ThumbnailsSliderType> = ({
	className,
	onSlideUpdate,
	currentSlideIndex,
	children,
}) => {
	const slider = useRef<Splide>(null)

	useEffect(() => {
		if (slider.current) {
			slider.current.go(currentSlideIndex)
		}
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
			onMoved={(splide) => onSlideUpdate(splide.index)}
		>
			<SplideTrack>{children}</SplideTrack>
		</Splide>
	)
}

export default ThumbnailsSlider
