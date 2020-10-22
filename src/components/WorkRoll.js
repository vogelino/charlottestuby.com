import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Works from './pages/Works'
// import PreviewCompatibleImage from './PreviewCompatibleImage'

const WorkRoll = ({ currentSlideIndex, setCurrentWorksSlide, works }) => {
	const [isLoading, setIsLoading] = useState(true)
	const startLoading = () => setIsLoading(true)
	const stopLoading = () => setIsLoading(true)

	return (
		<Works
			works={works}
			currentSlideIndex={currentSlideIndex}
			setCurrentWorksSlide={setCurrentWorksSlide}
			isLoading={isLoading}
			startLoading={startLoading}
			stopLoading={stopLoading}
			navigateTo={navigate}
			listHeight={`calc(${works.length}00vh - ${works.length * 172}px)`}
		/>
	)
}

WorkRoll.propTypes = {
	currentSlideIndex: PropTypes.number.isRequired,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	works: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					url: PropTypes.string,
					caption: PropTypes.string,
				}),
			).isRequired,
			landscapeThumb: PropTypes.string.isRequired,
			portraitThumb: PropTypes.string.isRequired,
		}),
	),
}

export default WorkRoll
