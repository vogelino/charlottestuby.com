import React from 'react'
import PropTypes from 'prop-types'
import Image from '../atoms/Img'
import Link from '../atoms/Link'

const Press = ({ pressList = [] }) => (
	<div id="press-content">
		<section className="press-content">
			{pressList.map(({ title, date, url, file, screenshot }) => (
				<div key={title} className="press-link">
					<Image fluid={screenshot.fluid} className="press-image" />
					<h3 className="press-date">{date}</h3>
					<h2 className="press-title">{title}</h2>
					<p className="press-link">
						<Link href={url || file} title={title}>
							{url ? new URL(url).host : 'PDF'}
						</Link>
					</p>
				</div>
			))}
		</section>
	</div>
)

export const aboutPropTypes = {
	pressList: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			url: PropTypes.string,
			file: PropTypes.string,
			screenshot: PropTypes.shape({
				fluid: PropTypes.object.isRequired,
			}).isRequired,
		}),
	),
}

Press.propTypes = aboutPropTypes

export default Press
