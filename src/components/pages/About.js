import React from 'react'
import PropTypes from 'prop-types'
import Link from '../atoms/Link'
import { HTMLContent } from '../Content'
import BlueEmptyForm from '../molecules/Forms/BlueEmptyForm'
import BlueFullForm from '../molecules/Forms/BlueFullForm'
import RedEmptyForm from '../molecules/Forms/RedEmptyForm'
import RedFullForm from '../molecules/Forms/RedFullForm'
import WhiteForm from '../molecules/Forms/WhiteForm'
import YellowEmptyForm from '../molecules/Forms/YellowEmptyForm'
import YellowFullForm from '../molecules/Forms/YellowFullForm'
import YellowFullForm2 from '../molecules/Forms/YellowFullForm2'

const About = ({ title, text, emailAddress, subtitle, portrait, cvUrl }) => (
	<div id="about-content">
		<section className="about-picture">
			<div
				className="img"
				style={{
					backgroundImage: `url(${portrait})`,
				}}
			/>
			<BlueEmptyForm />
			<BlueFullForm />
			<RedEmptyForm />
			<RedFullForm />
			<WhiteForm />
			<YellowEmptyForm />
			<YellowFullForm />
			<YellowFullForm2 />
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
	portrait: PropTypes.string.isRequired,
}

About.propTypes = aboutPropTypes

export default About
