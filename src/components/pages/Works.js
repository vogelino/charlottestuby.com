import React from 'react'
import PropTypes from 'prop-types'
import WorkThumbnail from '../organisms/WorkThumbnail'
import WorkCaption from '../organisms/WorkCaption'
import ThumbnailsSlider from '../organisms/ThumbnailsSlider'
import ThumbnailsBulletNav from '../organisms/ThumbnailsBulletNav'
import ThumbnailsArrowNav from '../organisms/ThumbnailsArrowNav'
import { workPropTypes } from '../organisms/Work'

const CAPTION_HEIGHT = 112

const Works = ({ works, worksSlider, navigateTo, listHeight }) => (
	<section className="works-list" style={{ height: listHeight }}>
		<ThumbnailsSlider className="work-thumbnails">
			{works.map((item, index) => (
				<WorkThumbnail key={index} navigateTo={navigateTo} {...item} />
			))}
		</ThumbnailsSlider>
		<div className="work-captions">
			<ul
				className="work-caption-track"
				style={{
					marginTop: worksSlider.currentSlide * CAPTION_HEIGHT * -1,
				}}
			>
				{works.map((item, index) => (
					<WorkCaption key={index} {...item} />
				))}
			</ul>
		</div>
		<ThumbnailsBulletNav
			itemsAmount={works.length}
			activeItemIndex={worksSlider.currentSlide}
		/>
		<ThumbnailsArrowNav
			itemsAmount={works.length}
			activeItemIndex={worksSlider.currentSlide}
		/>
	</section>
)

Works.propTypes = {
	works: PropTypes.arrayOf(PropTypes.shape(workPropTypes)).isRequired,
	worksSlider: PropTypes.object.isRequired,
	navigateTo: PropTypes.func.isRequired,
	listHeight: PropTypes.number.isRequired,
}

export default Works
