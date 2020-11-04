import React from 'react'
import PropTypes from 'prop-types'
import WorkThumbnail from '../organisms/WorkThumbnail'
import WorkCaption from '../organisms/WorkCaption'
import ThumbnailsSlider from '../organisms/ThumbnailsSlider'
import ThumbnailsBulletNav from '../organisms/ThumbnailsBulletNav'
import ThumbnailsArrowNav from '../organisms/ThumbnailsArrowNav'
import { workPropTypes } from '../organisms/Work'

const CAPTION_HEIGHT = 112

const Works = ({
	works,
	currentSlideIndex,
	setCurrentWorksSlide,
	navigateTo,
	listHeight,
}) => (
	<section className="works-list" style={{ height: listHeight }}>
		<ThumbnailsSlider
			className="work-thumbnails"
			currentSlideIndex={currentSlideIndex}
			setCurrentWorksSlide={setCurrentWorksSlide}
			setWorksSliderDragState={() => {}}
		>
			{works.map((item, index) => (
				<WorkThumbnail
					key={index}
					onClick={navigateTo}
					{...item}
					startLoading={() => {}}
				/>
			))}
		</ThumbnailsSlider>
		<div className="work-captions">
			<ul
				className="work-caption-track"
				style={{
					marginTop: currentSlideIndex * CAPTION_HEIGHT * -1,
				}}
			>
				{works.map((item, index) => (
					<WorkCaption
						key={index}
						{...item}
						startLoading={() => {}}
					/>
				))}
			</ul>
		</div>
		<ThumbnailsBulletNav
			itemsAmount={works.length}
			activeItemIndex={currentSlideIndex}
			setCurrentWorksSlide={setCurrentWorksSlide}
		/>
		<ThumbnailsArrowNav
			itemsAmount={works.length}
			activeItemIndex={currentSlideIndex}
			setCurrentWorksSlide={setCurrentWorksSlide}
		/>
	</section>
)

Works.propTypes = {
	works: PropTypes.arrayOf(PropTypes.shape(workPropTypes)).isRequired,
	currentSlideIndex: PropTypes.number.isRequired,
	navigateTo: PropTypes.func.isRequired,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	listHeight: PropTypes.string.isRequired,
}

export default Works
