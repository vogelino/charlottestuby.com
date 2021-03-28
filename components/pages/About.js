import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Image from 'next/image'
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
				<Image src={portrait} width="400" height="400" objectFit="cover" layout="responsive" />
			</div>
			<div className="about-forms">
				<div>
					{forms.map((form) => (
						<span
							key={form.image}
							className="about-form floating"
							style={{
								top: `${form.posY}vh`,
								left: `${form.posX}vw`,
							}}
						>
							<Image src={form.image} width="300" height="300" layout="fixed" objectFit="contain" />
						</span>
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
				{typeof text === 'string' ? <ReactMarkdown source={text} /> : text}
			</div>
			{cvUrl && cvButtonText && (
				<Link className="btn" href={`${cvUrl}`} target="__blank" title={cvButtonText}>
					{cvButtonText}
				</Link>
			)}
			{emailAddress && emailButtonText && (
				<Link className="btn" href={`mailto:${emailAddress}`} title={emailButtonText}>
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
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	emailAddress: PropTypes.string,
	emailButtonText: PropTypes.string,
	cvUrl: PropTypes.string,
	cvButtonText: PropTypes.string,
	instagramUsername: PropTypes.string,
	instagramButtonText: PropTypes.string,
	portrait: PropTypes.string.isRequired,
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.string.isRequired,
			posX: PropTypes.number.isRequired,
			posY: PropTypes.number.isRequired,
		})
	),
}

About.propTypes = aboutPropTypes

export default About
