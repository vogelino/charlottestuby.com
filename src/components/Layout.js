import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import MetaTags from './MetaTags'

const TemplateWrapper = ({ children }) => (
	<div>
		<MetaTags />
		<Navbar />
		{children}
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.node,
}

export default TemplateWrapper
