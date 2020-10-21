import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import MetaTags from './MetaTags'
import Header from './Header'
import ThumbnailsForms from './ThumbnailsForms'

const TemplateWrapper = ({ children, page = '' }) => (
	<main className={page.replace('/', '') || 'home'}>
		<MetaTags />
		<Header />
		<article>
			{!page.startsWith('/work/') && <Navbar />}
			<section className="content">{children}</section>
		</article>
		{page === '/work' && <ThumbnailsForms />}
	</main>
)

TemplateWrapper.propTypes = {
	children: PropTypes.node,
	page: PropTypes.string,
}

export default TemplateWrapper
