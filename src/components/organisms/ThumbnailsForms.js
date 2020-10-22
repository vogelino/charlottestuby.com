import React from 'react'
import PropTypes from 'prop-types'
import List from '../atoms/List'
import ListElement from '../atoms/ListElement'

const ThumbnailsForms = ({ forms = [], currentSlide = 0 }) => (
	<div className="thumbnail-forms">
		<List
			className="thumbnail-forms-list"
			style={{
				height: `${forms.length}00vh`,
				top: `calc(-${currentSlide} * 100vh - 30px)`,
			}}
		>
			{forms.map(({ url, id }, index) => (
				<ListElement
					className={`thumbnail-form ${
						index === currentSlide ? 'active' : ''
					}`}
					key={id}
					style={{ backgroundImage: `url('${url}')` }}
				/>
			))}
		</List>
	</div>
)

ThumbnailsForms.propTypes = {
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	).isRequired,
	currentSlide: PropTypes.number.isRequired,
}

export default ThumbnailsForms
