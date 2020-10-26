import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import Image from '../atoms/Img'
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
				<Image fluid={portrait.fluid} />
			</div>
			<div className="about-forms">
				<div>
					{forms.map((form) => (
						<Image
							key={form.id}
							relativePath={form.relativePath}
							className="about-form floating"
							style={{
								top: `${form.posY}vh`,
								left: `${form.posX}vw`,
							}}
							loading="lazy"
						/>
					))}
				</div>
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
			relativePath: PropTypes.string.isRequired,
			posX: PropTypes.number.isRequired,
			posY: PropTypes.number.isRequired,
		}),
	),
}

About.propTypes = aboutPropTypes

export default About
