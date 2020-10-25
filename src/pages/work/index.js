import React, { useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/Layout'
import WorkRoll from '../../components/WorkRoll'
import { mapForms, mapWorks } from '../../utils/mapUtil'

const WorkPage = ({ works = [], forms = [] }) => {
	const [currentSlideIndex, setCurrentWorksSlide] = useState(0)

	return (
		<Layout page="/" forms={forms} currentSlideIndex={currentSlideIndex}>
			<WorkRoll
				works={works}
				currentSlideIndex={currentSlideIndex}
				setCurrentWorksSlide={setCurrentWorksSlide}
			/>
		</Layout>
	)
}

const WorkPageWithQuery = () => (
	<StaticQuery
		query={graphql`
			query WorkPageQuery {
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
								decorativeForm {
									childImageSharp {
										fluid(maxWidth: 300) {
											...GatsbyImageSharpFluid
										}
									}
								}
								thumbnail {
									childImageSharp {
<<<<<<< HEAD
										fluid(
											maxWidth: 1220
											traceSVG: {
												color: "#FFFF00"
												blackOnWhite: false
											}
										) {
											...GatsbyImageSharpFluid_withWebp_tracedSVG
=======
										fluid(maxWidth: 1220) {
											...GatsbyImageSharpFluid
>>>>>>> parent of b05960c... Use tracedSVG loading technique
										}
									}
								}
							}
						}
					}
				}
			}
		`}
		render={(data) => {
			const works = mapWorks(data)
			return <WorkPage works={works} forms={mapForms(works)} />
		}}
	/>
)

export default WorkPageWithQuery
