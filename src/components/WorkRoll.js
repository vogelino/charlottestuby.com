import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Works from './pages/Works'
// import PreviewCompatibleImage from './PreviewCompatibleImage'

class WorkRoll extends React.Component {
	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark

		return (
			<div>
				{posts &&
					posts.map(({ node: post }) => (
						<div key={post.id}>
							<article>
								<header>
									<p>
										<Link to={post.fields.slug}>
											{post.frontmatter.title}
										</Link>
										<span> &bull; </span>
										<span>{post.frontmatter.date}</span>
									</p>
								</header>
							</article>
						</div>
					))}
			</div>
		)
	}
}

WorkRoll.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

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
		render={(data, count) => (
			<Works
				works={data.allMarkdownRemark.edges
					.map(({ node }) => ({
						id: node.id,
						title: node.frontmatter.title,
						subtitle: node.frontmatter.subtitle,
						slug: node.frontmatter.templateKey,
						images: node.frontmatter.images,
						landscapeThumb:
							node.frontmatter.landscapeThumb.relativePath,
						portraitThumb:
							node.frontmatter.portraitThumb.relativePath,
					}))
					.sort((a, b) => {
						if (a.orderOrfAppearance < b.orderOrfAppearance) {
							return -1
						}
						if (a.orderOrfAppearance > b.orderOrfAppearance) {
							return 1
						}
						return 0
					})}
				currentSlideIndex={0}
				navigateTo={() => {}}
				listHeight={`${count}00vh`}
			/>
		)}
	/>
)

export default WorkRollWithQuery
