import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import List from '../../List'
import ListElement from '../../ListElement'
import Icon from '../../Icon'
import Image from 'next/image'
import WorkLink from '../../WorkLink'

let LAST_SRCOLL_POS = 0
let MIN_SCROLL_DIS = 80

const formatDescription = (description) =>
	description.split(',').map((part, index) =>
		index === 0 ? (
			<em key={index}>{part},</em>
		) : (
			<span key={index}>
				{index === 1 ? '' : ','}
				{part}
			</span>
		)
	)

const Work = ({
	previousWork,
	nextWork,
	work: { title, id, subtitle, description, slug, images },
}) => {
	const [isScrollingUp, setIsScrollingUp] = useState(false)
	useEffect(() => {
		const handler = () => {
			const currentScroll = window.pageYOffset
			const isBelowMinDist = currentScroll <= MIN_SCROLL_DIS
			const isGoingDown = currentScroll > LAST_SRCOLL_POS
			const isGoingUp = currentScroll < LAST_SRCOLL_POS

			if (isGoingDown) setIsScrollingUp(false)
			if (isGoingUp) setIsScrollingUp(isBelowMinDist ? false : true)

			LAST_SRCOLL_POS = currentScroll
		}
		window.addEventListener('scroll', handler)
		return () => {
			window.removeEventListener('scroll', handler)
		}
	}, [])

	return (
		<div className={`work-container ${slug}`} id={id}>
			<div className={`work-header ${isScrollingUp && 'scroll-up'}`}>
				<div className="work-header-container">
					<h2 className="work-title">{title}</h2>
					<span>
						<Link href="/" className="work-close-button" title="Back to the homepage">
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
					<Link href="/" className="work-close-button" title="Back to the homepage">
						<Icon iconId="cross" />
					</Link>
				</div>
			) : null}
			<List className="work-images">
				{images.map(({ image, caption }) => (
					<ListElement className="work-image" key={image}>
						<figure>
							<div className="work-image-loading-container">
								<Image src={image} layout="fill" objectFit="contain" />
							</div>
							{caption ? <figcaption>{formatDescription(caption)}</figcaption> : null}
						</figure>
					</ListElement>
				))}
			</List>
			<List className="work-links">
				{previousWork && (
					<ListElement>
						<WorkLink {...previousWork} />
					</ListElement>
				)}
				{nextWork && (
					<ListElement>
						<WorkLink {...nextWork} />
					</ListElement>
				)}
			</List>
		</div>
	)
}

export const workPropTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	description: PropTypes.string,
	slug: PropTypes.string.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.string,
			caption: PropTypes.string,
		})
	).isRequired,
	thumbnail: PropTypes.oneOfType([
		PropTypes.shape({
			fixed: PropTypes.object,
		}),
		PropTypes.string,
	]).isRequired,
}

Work.propTypes = {
	work: PropTypes.shape(workPropTypes).isRequired,
	previousWork: PropTypes.shape(workPropTypes),
	nextWork: PropTypes.shape(workPropTypes),
	startLoading: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
}

export default Work
