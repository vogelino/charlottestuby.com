import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import ThumbnailsForms from './ThumbnailsForms'
import MetaTags from './MetaTags'
import Header from './Header'

const getPageClass = (page) => {
	if (page.startsWith('/work/')) return 'work without-navs'
	if (page.includes('about')) return 'about'
	if (page.includes('press')) return 'press'
	return 'home'
}

const setVh = () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const TemplateWrapper = ({
	children,
	page = '',
	currentSlideIndex = 0,
	forms = [],
	isPreview = false,
}) => {
	useEffect(() => {
		setVh()
		window.addEventListener('resize', setVh)

		return () => {
			window.removeEventListener('resize', setVh)
		}
	}, [page])

	return (
		<main className={getPageClass(page)}>
			{!isPreview && <MetaTags />}
			{!page.startsWith('/work/') && <Header isPreview={isPreview} />}
			<article>
				{!page.startsWith('/work/') && (
					<Navigation page={page.replace('/', '')} isPreview={isPreview} />
				)}
				<section className="content">{children}</section>
			</article>
			{page === '/' && <ThumbnailsForms currentSlide={currentSlideIndex} forms={forms} />}
		</main>
	)
}

TemplateWrapper.propTypes = {
	children: PropTypes.node,
	page: PropTypes.string,
	isPreview: PropTypes.bool,
	currentSlideIndex: PropTypes.number,
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			decorativeForm: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	),
}

export default TemplateWrapper
