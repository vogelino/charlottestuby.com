import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const WorkTemplate = ({
	content,
	contentComponent,
	description,
	title,
	helmet,
}) => {
	const PostContent = contentComponent || Content

	return (
		<section className="section">
			{helmet || ''}
			<div className="container content">
				<div className="columns">
					<div className="column is-10 is-offset-1">
						<h1 className="title is-size-2 has-text-weight-bold is-bold-light">
							{title}
						</h1>
						<p>{description}</p>
						<PostContent content={content} />
					</div>
				</div>
			</div>
		</section>
	)
}

WorkTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.object,
}

const Work = ({ data }) => {
	const { markdownRemark: work } = data

	return (
		<Layout page={`/work/${work.fields.slug}`}>
			<WorkTemplate
				content={work.html}
				contentComponent={HTMLContent}
				description={work.frontmatter.description}
				helmet={
					<Helmet titleTemplate="%s | Projet">
						<title>{`${work.frontmatter.title}`}</title>
						<meta
							name="description"
							content={`${work.frontmatter.description}`}
						/>
					</Helmet>
				}
				title={work.frontmatter.title}
			/>
		</Layout>
	)
}

Work.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
}

export default Work

export const pageQuery = graphql`
	query WorkByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			fields {
				slug
			}
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
			}
		}
	}
`
