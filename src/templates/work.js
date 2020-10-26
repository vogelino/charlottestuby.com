import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import Work from '../components/organisms/Work'
import { mapWork } from '../utils/mapUtil'

let LAST_SRCOLL_POS = 0
let MIN_SCROLL_DIS = 80
const SCROLL_UP_CLASS = 'scroll-up'
const SCROLL_DOWN_CLASS = 'scroll-down'

const onScroll = () => {
	const body = document.body
	const currentScroll = window.pageYOffset

	if (currentScroll <= MIN_SCROLL_DIS) {
		body.classList.remove(SCROLL_UP_CLASS)
		return
	}

	if (
		currentScroll > LAST_SRCOLL_POS &&
		!body.classList.contains(SCROLL_DOWN_CLASS)
	) {
		// down
		body.classList.remove(SCROLL_UP_CLASS)
		body.classList.add(SCROLL_DOWN_CLASS)
	} else if (
		currentScroll < LAST_SRCOLL_POS &&
		body.classList.contains(SCROLL_DOWN_CLASS)
	) {
		// up
		body.classList.remove(SCROLL_DOWN_CLASS)
		body.classList.add(SCROLL_UP_CLASS)
	}
	LAST_SRCOLL_POS = currentScroll
}

export const WorkTemplate = ({ data }) => {
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

	const { markdownRemark, allMarkdownRemark } = data
	const work = mapWork(markdownRemark)
	const works = allMarkdownRemark.edges.map(({ node }) => mapWork(node))
	const currentWorkIdx = works.findIndex(
		({ id: compareID }) => work.id === compareID,
	)
	const nextWork =
		works[currentWorkIdx + 1 > works.length - 1 ? 0 : currentWorkIdx + 1]
	const prevWork =
		works[currentWorkIdx - 1 < 0 ? works.length - 1 : currentWorkIdx - 1]

	return (
		<Layout page={work.slug}>
			<Helmet titleTemplate="%s | Projet">
				<title>{`${work.title}`}</title>
				<meta name="description" content={`${work.description}`} />
			</Helmet>
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

WorkTemplate.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export default WorkTemplate

export const pageQuery = graphql`
	query WorkByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			fields {
				slug
			}
			frontmatter {
				title
				subtitle
				description
				images {
					image {
						relativePath
						childImageSharp {
							fluid(maxWidth: 1280, quality: 90) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
					caption
				}
			}
		}
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___orderOfAppearance] }
			filter: { frontmatter: { templateKey: { eq: "work" } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						orderOfAppearance
						title
						subtitle
						thumbnail {
							childImageSharp {
								fixed(width: 56, height: 56) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				}
			}
		}
	}
`
