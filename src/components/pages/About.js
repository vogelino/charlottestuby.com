import React from 'react'
import PropTypes from 'prop-types'
import GatsbyImage from 'gatsby-image'
import Link from '../atoms/Link'
import { HTMLContent } from '../Content'

const About = ({
	title = '',
	text = '',
	emailAddress = '',
	subtitle = '',
	portrait = { fluid: {} },
	cvUrl = '',
	forms = [],
}) => (
	<div id="about-content">
		<section className="about-picture">
			<div className="img">
				<GatsbyImage fluid={portrait.fluid} />
				{forms.map((form) => (
					<GatsbyImage
						key={form.id}
						fluid={form.fluid}
						style={{
							top: `${form.posY}vh`,
							left: `${form.posX}vw`,
						}}
					/>
				))}
			</div>
		</section>
		<section className="about-content">
			<h1>{title}</h1>
			{subtitle && <h3>{subtitle}</h3>}
			<div className="about-text">
				<HTMLContent content={text} />
			</div>
			<Link
				className="btn"
				href={`${cvUrl}`}
				target="__blank"
				title="download curriculum"
			>
				download curriculum
			</Link>
			<Link
				className="btn"
				href={`mailto:${emailAddress}`}
				title="write me an email"
			>
				write me an email
			</Link>
		</section>
	</div>
)

export const aboutPropTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	emailAddress: PropTypes.string,
	cvUrl: PropTypes.string,
	portrait: PropTypes.shape({
		fluid: PropTypes.object.isRequired,
	}).isRequired,
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			fluid: PropTypes.object.isRequired,
			posX: PropTypes.number.isRequired,
			posY: PropTypes.number.isRequired,
		}),
	),
}

About.propTypes = aboutPropTypes

export default About
