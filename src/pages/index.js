import React from 'react'
import PropTypes from 'prop-types'
import { navigate, graphql } from 'gatsby'

import WorksPage from '../components/pages/Works'
import { mapForms, mapWorks } from '../utils/mapUtil'
import '../styles/css/common.css'
import '../styles/css/work.css'

const IndexPage = ({ data }) => {
	const works = mapWorks(data)
	return (
		<WorksPage
			works={works}
			forms={mapForms(works)}
			navigateTo={navigate}
		/>
	)
}

IndexPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export const query = graphql`
	query WorkPageQuery {
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
						decorativeForm {
							relativePath
						}
						thumbnail {
							childImageSharp {
								fluid(maxWidth: 1220) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
			}
		}
	}
`

export default IndexPage
