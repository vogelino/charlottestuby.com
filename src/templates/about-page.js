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
				forms={post.frontmatter.forms.map((form) => ({
					id: form.image.id,
					relativePath: form.image.relativePath,
					posX: form.posX,
					posY: form.posY,
				}))}
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
						fluid(maxWidth: 960, quality: 90) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
				forms {
					image {
						id
						relativePath
					}
					posX
					posY
				}
			}
		}
	}
`
