import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import MetaTags from './MetaTags'
import Header from './Header'
import ThumbnailsForms from './ThumbnailsForms'
import '../styles/index.styl'

const TemplateWrapper = ({ children, page = '' }) => (
	<div>
		<MetaTags />
		<article>
			<Header />
			{!page.startsWith('/work/') && <Navbar />}
			<section>{children}</section>
		</article>
		{page === '/work' && <ThumbnailsForms />}
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.node,
	page: PropTypes.string,
}

export default TemplateWrapper
