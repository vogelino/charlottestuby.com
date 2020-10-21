import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Works from './pages/Works'
// import PreviewCompatibleImage from './PreviewCompatibleImage'

const WorkRoll = ({ works }) => {
	const [currentSlideIndex, setCurrentWorksSlide] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const startLoading = () => setIsLoading(true)
	const stopLoading = () => setIsLoading(true)

	return (
		<Works
			works={works}
			currentSlideIndex={currentSlideIndex}
			setCurrentWorksSlide={setCurrentWorksSlide}
			isLoading={isLoading}
			startLoading={startLoading}
			stopLoading={stopLoading}
			navigateTo={() => {}}
			listHeight={`calc(${works.length}00vh - ${works.lenght * 172}px)`}
		/>
	)
}

WorkRoll.propTypes = {
	works: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					url: PropTypes.string,
					caption: PropTypes.string,
				}),
			).isRequired,
			landscapeThumb: PropTypes.string.isRequired,
			portraitThumb: PropTypes.string.isRequired,
		}),
	),
}

const mapWorks = ({ allMarkdownRemark: { edges: works } }) =>
	works
		.sort((a, b) => {
			if (a.orderOrfAppearance < b.orderOrfAppearance) {
				return -1
			}
			if (a.orderOrfAppearance > b.orderOrfAppearance) {
				return 1
			}
			return 0
		})
		.map(({ node: { id, fields, frontmatter } }) => ({
			id: id,
			title: frontmatter.title,
			subtitle: frontmatter.subtitle,
			slug: fields.slug,
			images: frontmatter.images.map((img) => ({
				url: `/img/${img.image.relativePath}`,
				caption: img.caption,
			})),
			landscapeThumb: `/img/${frontmatter.landscapeThumb.relativePath}`,
			portraitThumb: `/img/${frontmatter.portraitThumb.relativePath}`,
		}))

const WorkRollWithQuery = () => (
	<StaticQuery
		query={graphql`
			query WorkRollQuery {
				allMarkdownRemark(
					sort: {
						order: DESC
						fields: [frontmatter___orderOfAppearance]
					}
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
								templateKey
								date(formatString: "MMMM DD, YYYY")
								images {
									image {
										relativePath
									}
									caption
								}
								landscapeThumb {
									relativePath
								}
								portraitThumb {
									relativePath
								}
							}
						}
					}
				}
			}
		`}
		render={(data) => <WorkRoll works={mapWorks(data)} />}
	/>
)

export default WorkRollWithQuery
