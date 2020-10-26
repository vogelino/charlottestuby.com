import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import List from '../atoms/List'
// import Img from '../atoms/Img'
import ListElement from '../atoms/ListElement'
import Icon from '../atoms/Icon'
import Image from '../atoms/Img'
import WorkLink from './WorkLink'

const formatDescription = (description) =>
	description.split(',').map((part, index) =>
		index === 0 ? (
			<em key={index}>{part},</em>
		) : (
			<span key={index}>
				{index === 1 ? '' : ','}
				{part}
			</span>
		),
	)

const Work = ({
	previousWork,
	nextWork,
	work: { title, id, subtitle, description, slug, images },
}) => (
	<div className={`work-container ${slug}`} id={id}>
		<div className="work-header">
			<div className="work-header-container">
				<h2 className="work-title">{title}</h2>
				<span>
					<Link
						href="/"
						className="work-close-button"
						title="Back to the homepage"
					>
						<Icon iconId="cross" />
					</Link>
				</span>
			</div>
		</div>
		{description ? (
			<div className="work-head">
				<h2 className="work-title">{title}</h2>
				<h3 className="work-subtitle">{subtitle}</h3>
				<div className="work-description">{description}</div>
				<Link
					href="/"
					className="work-close-button"
					title="Back to the homepage"
				>
					<Icon iconId="cross" />
				</Link>
			</div>
		) : null}
		<List className="work-images">
			{images.map(({ caption, fluid }) => (
				<ListElement
					className="work-image"
					id={caption}
					key={fluid.src}
				>
					<figure>
						<div className="work-image-loading-container">
							<Image fluid={fluid} />
							{/* <Img src={url} alt={caption} /> */}
						</div>
					</figure>
					{caption ? (
						<figcaption>{formatDescription(caption)}</figcaption>
					) : null}
				</ListElement>
			))}
		</List>
		<List className="work-links">
			<ListElement>
				<WorkLink {...previousWork} />
			</ListElement>
			<ListElement>
				<WorkLink {...nextWork} />
			</ListElement>
		</List>
	</div>
)

export const workPropTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	description: PropTypes.string,
	slug: PropTypes.string.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			fluid: PropTypes.object,
			url: PropTypes.string,
			caption: PropTypes.string,
		}),
	).isRequired,
}

Work.propTypes = {
	work: PropTypes.shape(workPropTypes).isRequired,
	previousWork: PropTypes.shape(workPropTypes).isRequired,
	nextWork: PropTypes.shape(workPropTypes).isRequired,
	startLoading: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
}

export default Work
