import React, { useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/Layout'
import WorkRoll from '../../components/WorkRoll'

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

const getSorterByKey = (key) => (a, b) => {
	if (a[key] < b[key]) {
		return -1
	}
	if (a[key] > b[key]) {
		return 1
	}
	return 0
}

const mapWorks = ({ allMarkdownRemark: { edges: works } }) =>
	works
		.map(({ node: { id, fields, frontmatter } }) => ({
			id: id,
			title: frontmatter.title,
			subtitle: frontmatter.subtitle,
			slug: fields.slug,
			images: frontmatter.images.map((img) => ({
				url: `/img/${img.image.relativePath}`,
				caption: img.caption,
			})),
			order: frontmatter.orderOfAppearance,
			decorativeForm: `/img/${frontmatter.decorativeForm.relativePath}`,
			landscapeThumb: `/img/${frontmatter.landscapeThumb.relativePath}`,
			portraitThumb: `/img/${frontmatter.portraitThumb.relativePath}`,
		}))
		.sort(getSorterByKey('order'))

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
