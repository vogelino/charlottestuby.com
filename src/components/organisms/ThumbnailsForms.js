import React from 'react'
import PropTypes from 'prop-types'
import List from '../atoms/List'
import ListElement from '../atoms/ListElement'
import Image from '../atoms/Img'

const ThumbnailsForms = ({ forms = [], currentSlide = 0 }) => (
	<div className="thumbnail-forms">
		<List
			className="thumbnail-forms-list"
			style={{
				height: `${forms.length}00vh`,
				top: `calc(-${currentSlide} * (var(--vh, 1vh) * 100) - 30px)`,
			}}
		>
			{forms.map(({ relativePath, id }, index) => (
				<ListElement
					className={`thumbnail-form ${
						index === currentSlide ? 'active' : ''
					}`}
					key={id}
				>
					<Image relativePath={relativePath} loading="lazy" />
				</ListElement>
			))}
		</List>
	</div>
)

ThumbnailsForms.propTypes = {
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			relativePath: PropTypes.string.isRequired,
		}),
	).isRequired,
	currentSlide: PropTypes.number.isRequired,
}

export default ThumbnailsForms
