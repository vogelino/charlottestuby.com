import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Image from '../Img'
import ReactMarkdown from 'react-markdown'

const About = ({
	title = '',
	text = '',
	emailAddress = '',
	emailButtonText = '',
	instagramUsername = '',
	instagramButtonText = '',
	subtitle = '',
	portrait = '',
	cvUrl = '',
	cvButtonText = '',
	forms = [],
}) => (
	<div id="about-content">
		<section className="about-picture">
			<div className="img">
				{portrait.fluid ? (
					<Image fluid={portrait.fluid} />
				) : (
					<Image relativePath={portrait} />
				)}
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
			<h1>
				<ReactMarkdown source={title} />
			</h1>
			{subtitle && (
				<h3>
					<ReactMarkdown source={subtitle} />
				</h3>
			)}
			<div className="about-text">
				<ReactMarkdown source={text} />
			</div>
			{cvUrl && cvButtonText && (
				<Link
					className="btn"
					href={`${cvUrl}`}
					target="__blank"
					title={cvButtonText}
				>
					{cvButtonText}
				</Link>
			)}
			{emailAddress && emailButtonText && (
				<Link
					className="btn"
					href={`mailto:${emailAddress}`}
					title={emailButtonText}
				>
					{emailButtonText}
				</Link>
			)}
			{instagramUsername && instagramButtonText && (
				<Link
					className="btn"
					href={`https://instagram.com/${instagramUsername}`}
					target="__blank"
					title={instagramButtonText}
				>
					{instagramButtonText}
				</Link>
			)}
		</section>
	</div>
)

export const aboutPropTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	emailAddress: PropTypes.string,
	emailButtonText: PropTypes.string,
	cvUrl: PropTypes.string,
	cvButtonText: PropTypes.string,
	instagramUsername: PropTypes.string,
	instagramButtonText: PropTypes.string,
	portrait: PropTypes.oneOfType([
		PropTypes.shape({
			fluid: PropTypes.object.isRequired,
		}),
		PropTypes.string,
	]).isRequired,
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
