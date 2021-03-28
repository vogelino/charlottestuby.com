import { FC, useState } from 'react'
import Head from 'next/head'
import { WorkType, FormType } from '../../types'
import WorkThumbnail from '../WorkThumbnail'
import WorkCaption from '../WorkCaption'
import ThumbnailsSlider from '../ThumbnailsSlider'
import ThumbnailsBulletNav from '../ThumbnailsBulletNav'
import ThumbnailsArrowNav from '../ThumbnailsArrowNav'
import Layout from '../Layout'

const CAPTION_HEIGHT = 112

interface WorksType {
	works: WorkType[]
	forms: FormType[]
}

const Works: FC<WorksType> = ({ works = [], forms = [] }) => {
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
				>
					{works.map((item, index) => (
						<WorkThumbnail key={index} {...item} />
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
							<WorkCaption key={index} {...item} />
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

export default Works
