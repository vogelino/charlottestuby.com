import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Press from '../components/pages/Press'

const PressPage = ({ data }) => {
	const {
		markdownRemark: { frontmatter: post },
	} = data
	return (
		<Layout page="/press">
			<Press
				pressList={post.pressList.map(
					({ title, date, url, file, screenshot }) => ({
						title,
						date,
						url,
						file: file?.publicURL || '',
						screenshot: screenshot.childImageSharp,
					}),
				)}
			/>
		</Layout>
	)
}

PressPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default PressPage

export const pressPageQuery = graphql`
	query PressPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				pressList {
					date
					title
					url
					pdfFile {
						publicURL
					}
					screenshot {
						childImageSharp {
							fluid(maxWidth: 600, quality: 90) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			}
		}
	}
`
