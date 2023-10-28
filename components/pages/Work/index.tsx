import { FC, useState, useEffect, ReactNode } from 'react'
import Link from '../../Link'
import List from '../../List'
import ListElement from '../../ListElement'
import Icon from '../../Icon'
import Image from "next/legacy/image"
import WorkLink from '../../WorkLink'
import { WorkType } from '../../../types'

interface WorkPropType {
	previousWork?: WorkType
	nextWork?: WorkType
	work: Pick<WorkType, 'title' | 'id' | 'subtitle' | 'description' | 'slug' | 'images'>
}

let LAST_SRCOLL_POS = 0
const MIN_SCROLL_DIS = 80

const formatDescription = (description: string): ReactNode =>
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

const Work: FC<WorkPropType> = ({
	previousWork,
	nextWork,
	work: { title, id, subtitle, description, slug, images },
}) => {
	const [isScrollingUp, setIsScrollingUp] = useState(false)
	useEffect(() => {
		const handler = (): void => {
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
						<Link href="/" className="work-close-button">
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
					<Link href="/" className="work-close-button">
						<Icon iconId="cross" />
					</Link>
				</div>
			) : null}
			<List className="work-images">
				{images.map(({ image, caption }) => (
					<ListElement className="work-image" key={image}>
						<figure>
							<div className="work-image-loading-container">
								<Image alt="" src={image} layout="fill" objectFit="contain" />
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

export default Work
