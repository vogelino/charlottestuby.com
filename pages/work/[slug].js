import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import Work from '../../components/pages/Work'
import Head from 'next/head'
import { getAllWorksContents } from '../../utils/staticPathsUtil'

let LAST_SRCOLL_POS = 0
let MIN_SCROLL_DIS = 80
const SCROLL_UP_CLASS = 'scroll-up'
const SCROLL_DOWN_CLASS = 'scroll-down'

export const getStaticPaths = async () => {
	const allWorks = await getAllWorksContents()
	const paths = allWorks.map(({ slug }) => `/work/${slug}`)
	return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
	const slug = context.params.slug
	const works = await getAllWorksContents()
	const currentWorkIdx = works.findIndex(({ slug: compareSlug }) => slug === compareSlug)
	const work = works[currentWorkIdx]

	const nextWork = works[currentWorkIdx + 1 > works.length - 1 ? 0 : currentWorkIdx + 1]
	const prevWork = works[currentWorkIdx - 1 < 0 ? works.length - 1 : currentWorkIdx - 1]

	return {
		props: { work, nextWork, prevWork },
	}
}

const onScroll = () => {
	const body = document.body
	const currentScroll = window.pageYOffset

	if (currentScroll <= MIN_SCROLL_DIS) {
		body.classList.remove(SCROLL_UP_CLASS)
		return
	}

	if (currentScroll > LAST_SRCOLL_POS && !body.classList.contains(SCROLL_DOWN_CLASS)) {
		// down
		body.classList.remove(SCROLL_UP_CLASS)
		body.classList.add(SCROLL_DOWN_CLASS)
	} else if (currentScroll < LAST_SRCOLL_POS && body.classList.contains(SCROLL_DOWN_CLASS)) {
		// up
		body.classList.remove(SCROLL_DOWN_CLASS)
		body.classList.add(SCROLL_UP_CLASS)
	}
	LAST_SRCOLL_POS = currentScroll
}

const WorkTemplate = ({ work, nextWork, prevWork }) => {
	const [isLoading, setIsLoading] = useState(true)
	const startLoading = () => setIsLoading(true)
	const stopLoading = () => setIsLoading(true)

	useEffect(() => {
		document.body.classList.add(SCROLL_DOWN_CLASS)
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<Layout page={`/work/${work.slug}`}>
			<Head>
				<title>{`${work.title} | Projet`}</title>
				<meta name="description" content={`${work.description}`} />
				<link rel="stylesheet" href="/styles/work.css" />
			</Head>
			<Work
				work={work}
				nextWork={nextWork}
				previousWork={prevWork}
				startLoading={startLoading}
				stopLoading={stopLoading}
				loading={isLoading}
			/>
		</Layout>
	)
}

const WorkPropTypes = PropTypes.shape({
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.string.isRequired,
			captions: PropTypes.string,
		})
	).isRequired,
	order: PropTypes.number.isRequired,
	decorativeForm: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
})

WorkTemplate.propTypes = {
	work: WorkPropTypes,
	nextWork: WorkPropTypes,
	prevWork: WorkPropTypes,
}

export default WorkTemplate
