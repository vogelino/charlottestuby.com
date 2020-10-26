import React from 'react'
import PropTypes from 'prop-types'
import About from '../../components/pages/About'
import Layout from '../../components/Layout'
import '../../../public/styles.css'

const AboutPagePreview = ({ entry }) => {
	// debugger
	return (
		<Layout page="/about" isPreview>
			<About
				title={entry.getIn(['data', 'title'])}
				subtitle={entry.getIn(['data', 'subtitle'])}
				text={entry.getIn(['data', 'body'])}
				emailAddress={entry.getIn(['data', 'email'])}
				cvUrl={entry.getIn(['data', 'cv', 'publicURL'])}
				portrait={entry
					.getIn(['data', 'portrait'])
					.replace('/img/', '')}
				forms={entry.getIn(['data', 'forms']).map((form) => ({
					id: form.get('image'),
					relativePath: form.get('image').replace('/img/', ''),
					posX: form.get('posX'),
					posY: form.get('posY'),
				}))}
			/>
		</Layout>
	)
}

AboutPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default AboutPagePreview
