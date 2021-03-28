import { FC } from 'react'
import InteractiveText from './InteractiveText'
import Icon from './Icon'

interface ThumbnailsArrowNavType {
	itemsAmount: number
	activeItemIndex: number
	setCurrentWorksSlide: (currentSlide: number) => void
}

const ThumbnailsArrowNav: FC<ThumbnailsArrowNavType> = ({
	itemsAmount,
	activeItemIndex,
	setCurrentWorksSlide,
}) => {
	const hasPrev = activeItemIndex > 0
	const hasNext = activeItemIndex + 1 < itemsAmount
	const goPrev = (): void => {
		setCurrentWorksSlide(activeItemIndex - 1)
	}
	const goNext = (): void => {
		setCurrentWorksSlide(activeItemIndex + 1)
	}
	return (
		<div className="thumbnails-arrow-nav">
			{hasPrev ? (
				<InteractiveText onClick={goPrev} className="thumbnails-arrow arrow-prev">
					<Icon iconId="arrow-up" />
				</InteractiveText>
			) : (
				<span className="thumbnails-arrow arrow-prev">
					<Icon iconId="arrow-up" />
				</span>
			)}
			{hasNext ? (
				<InteractiveText onClick={goNext} className="thumbnails-arrow arrow-next">
					<Icon iconId="arrow-down" />
				</InteractiveText>
			) : (
				<span className="thumbnails-arrow arrow-next">
					<Icon iconId="arrow-down" />
				</span>
			)}
		</div>
	)
}

export default ThumbnailsArrowNav
