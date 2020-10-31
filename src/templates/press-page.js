import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Press from '../components/pages/Press'
import '../styles/css/common.css'
import '../styles/css/press.css'

const PressPage = ({ data }) => {
	const {
		markdownRemark: { frontmatter: post },
		site: {
			siteMetadata: { siteUrl },
		},
	} = data
	return (
		<Layout page="/press">
			<Press
				pressList={post.pressList.map(
					({ title, date, url, pdfFile, screenshot, color }) => ({
						title,
						date,
						url,
						color,
						file: pdfFile ? `${siteUrl}${pdfFile.publicURL}` : '',
						screenshot: screenshot.childImageSharp.fixed.src,
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
		site {
			siteMetadata {
				siteUrl
			}
		}
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
							fixed(width: 600, height: 600, quality: 90) {
								...GatsbyImageSharpFixed_withWebp
							}
						}
					}
					color
				}
			}
		}
	}
`
