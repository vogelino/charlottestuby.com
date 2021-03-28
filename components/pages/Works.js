import React, { useState } from 'react'
import PropTypes from 'prop-types'
import WorkThumbnail from '../WorkThumbnail'
import WorkCaption from '../WorkCaption'
import ThumbnailsSlider from '../ThumbnailsSlider'
import ThumbnailsBulletNav from '../ThumbnailsBulletNav'
import ThumbnailsArrowNav from '../ThumbnailsArrowNav'
import { workPropTypes } from './Work'
import Layout from '../Layout'
import Head from 'next/head'

const CAPTION_HEIGHT = 112

const Works = ({ works = [], forms = [] }) => {
	const [currentSlideIndex, setCurrentWorksSlide] = useState(0)
	return (
		<Layout page="/" forms={forms} currentSlideIndex={currentSlideIndex}>
			<Head>
				<link rel="stylesheet" href="/styles/index.css" />
			</Head>
			<section
				className="works-list"
				style={{
					height: `calc(${works.length}00vh - ${works.length * 172}px)`,
				}}
			>
				<ThumbnailsSlider
					className="work-thumbnails"
					currentSlideIndex={currentSlideIndex}
					setCurrentWorksSlide={setCurrentWorksSlide}
					setWorksSliderDragState={() => {}}
				>
					{works.map((item, index) => (
						<WorkThumbnail key={index} {...item} startLoading={() => {}} />
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
							<WorkCaption key={index} {...item} startLoading={() => {}} />
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
		</Layout>
	)
}

Works.propTypes = {
	works: PropTypes.arrayOf(PropTypes.shape(workPropTypes)).isRequired,
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			decorativeForm: PropTypes.string.isRequired,
		})
	),
}

export default Works
