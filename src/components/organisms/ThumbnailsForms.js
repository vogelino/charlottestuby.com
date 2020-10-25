import React from 'react'
import PropTypes from 'prop-types'
import List from '../atoms/List'
import ListElement from '../atoms/ListElement'
import GatsbyImage from 'gatsby-image'

const ThumbnailsForms = ({ forms = [], currentSlide = 0 }) => (
	<div className="thumbnail-forms">
		<List
			className="thumbnail-forms-list"
			style={{
				height: `${forms.length}00vh`,
				top: `calc(-${currentSlide} * 100vh - 30px)`,
			}}
		>
			{forms.map(({ fluid, id }, index) => (
				<ListElement
					className={`thumbnail-form ${
						index === currentSlide ? 'active' : ''
					}`}
					key={id}
				>
					<GatsbyImage fluid={fluid} />
				</ListElement>
			))}
		</List>
	</div>
)

ThumbnailsForms.propTypes = {
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			fluid: PropTypes.object.isRequired,
		}),
	).isRequired,
	currentSlide: PropTypes.number.isRequired,
}

export default ThumbnailsForms