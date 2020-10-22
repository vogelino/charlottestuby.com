import React, { useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/Layout'
import WorkRoll from '../../components/WorkRoll'
import { mapWorks } from '../../utils/mapUtil'

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

const mapForms = (works) =>
	works.map(({ id, decorativeForm }) => ({
		id: `form-${id}`,
		url: decorativeForm,
	}))

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
								templateKey
								date(formatString: "MMMM DD, YYYY")
								images {
									image {
										relativePath
									}
									caption
								}
								decorativeForm {
									relativePath
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
		render={(data) => {
			const works = mapWorks(data)
			return <WorkPage works={works} forms={mapForms(works)} />
		}}
	/>
)

export default WorkPageWithQuery
