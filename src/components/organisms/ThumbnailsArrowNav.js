import React from 'react'
import PropTypes from 'prop-types'
import InteractiveText from '../atoms/InteractiveText'
import Icon from '../atoms/Icon'

const ThumbnailsArrowNav = ({
	itemsAmount,
	activeItemIndex,
	setCurrentWorksSlide,
}) => {
	const hasPrev = activeItemIndex > 0
	const hasNext = activeItemIndex + 1 < itemsAmount
	const goPrev = () => {
		setCurrentWorksSlide(activeItemIndex - 1)
	}
	const goNext = () => {
		setCurrentWorksSlide(activeItemIndex + 1)
	}
	return (
		<div className="thumbnails-arrow-nav">
			{hasPrev ? (
				<InteractiveText
					onClick={goPrev}
					className="thumbnails-arrow arrow-prev"
				>
					<Icon iconId="arrow-up" />
				</InteractiveText>
			) : (
				<span className="thumbnails-arrow arrow-prev">
					<Icon iconId="arrow-up" />
				</span>
			)}
			{hasNext ? (
				<InteractiveText
					onClick={goNext}
					className="thumbnails-arrow arrow-next"
				>
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

ThumbnailsArrowNav.propTypes = {
	itemsAmount: PropTypes.number.isRequired,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	activeItemIndex: PropTypes.number.isRequired,
}

export default ThumbnailsArrowNav
