import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import { createBlob } from '../../utils/blobUtil'

const PressLi = ({
	id,
	title,
	date,
	url,
	file,
	screenshot,
	color = 'blue',
}) => {
	const blobRef = useRef()
	const blobPathRef = useRef()

	useEffect(() => {
		const commonConfig = {
			numPoints: 10,
			centerX: 150,
			centerY: 150,
			minRadius: 120,
			maxRadius: 125,
			minDuration: 1,
			maxDuration: 2,
		}
		createBlob({
			...commonConfig,
			clipPathElement: blobRef.current,
			pathElement: blobPathRef.current,
		})
	}, [id])

	return (
		<div className="press-link">
			<Link href={url || file} title={title} target="__blank">
				<svg
					viewBox="0 0 300 300"
					xmlns="https://www.w3.org/2000/svg"
					version="1.1"
					className="press-link-svg"
					style={{
						stroke: color,
					}}
				>
					<defs>
						<clipPath id={`path-${id}`}>
							<path ref={blobRef} />
						</clipPath>
					</defs>
					<image
						href={screenshot}
						clipPath={`url(#path-${id})`}
						width="300"
						height="300"
						preserveAspectRatio="xMinYMin slice"
						className="press-link-image"
					/>
					<path ref={blobPathRef} fill="transparent" />
				</svg>
				<div className="press-link-content">
					<h3 className="press-link-date">{date}</h3>
					<h2 className="press-link-title">{title}</h2>
					<h4 className="press-link-url">
						{url ? new URL(url).host : 'PDF'}
					</h4>
				</div>
			</Link>
		</div>
	)
}

PressLi.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	url: PropTypes.string,
	file: PropTypes.string,
	screenshot: PropTypes.string.isRequired,
}

const Press = ({ pressList = [] }) => (
	<div id="press-content">
		<section className="press-content">
			{pressList.map((li, idx) => (
				<PressLi key={`li-${idx}`} id={`li-${idx}`} {...li} />
			))}
		</section>
	</div>
)

export const aboutPropTypes = {
	pressList: PropTypes.arrayOf(
		PropTypes.shape({
			...PressLi.propTypes,
			id: undefined,
		}),
	),
}

Press.propTypes = aboutPropTypes

export default Press
