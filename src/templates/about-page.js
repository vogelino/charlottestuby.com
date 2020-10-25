import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import About from '../components/pages/About'

const AboutPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout page="/about">
			<About
				title={post.frontmatter.title}
				subtitle={post.frontmatter.subtitle}
				text={post.html}
				emailAddress={post.frontmatter.email}
				cvUrl={post.frontmatter.cv.publicURL}
				portrait={post.frontmatter.portrait.childImageSharp}
			/>
		</Layout>
	)
}

AboutPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
	query AboutPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				subtitle
				email
				cv {
					publicURL
				}
				portrait {
					childImageSharp {
<<<<<<< HEAD
						fluid(
							maxWidth: 960
							traceSVG: { color: "#FF0000", blackOnWhite: false }
						) {
							...GatsbyImageSharpFluid_withWebp_tracedSVG
=======
						fluid(maxWidth: 960) {
							...GatsbyImageSharpFluid
>>>>>>> parent of b05960c... Use tracedSVG loading technique
						}
					}
				}
			}
		}
	}
`
