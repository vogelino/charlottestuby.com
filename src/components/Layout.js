import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import ThumbnailsForms from './organisms/ThumbnailsForms'
import MetaTags from './MetaTags'
import Header from './Header'

const TemplateWrapper = ({
	children,
	page = '',
	currentSlideIndex = 0,
	forms = [],
}) => (
	<main className={page.replace('/', '') || 'home'}>
		<MetaTags />
		<Header />
		<article>
			{!page.startsWith('/work/') && (
				<Navbar page={page.replace('/', '')} />
			)}
			<section className="content">{children}</section>
		</article>
		{page === '/' && (
			<ThumbnailsForms currentSlide={currentSlideIndex} forms={forms} />
		)}
	</main>
)

TemplateWrapper.propTypes = {
	children: PropTypes.node,
	page: PropTypes.string,
	currentSlideIndex: PropTypes.number,
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	),
}

export default TemplateWrapper
