import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import ListElement from './ListElement'
import Image from 'next/image'

const ThumbnailsForms = ({ forms = [], currentSlide = 0 }) => (
	<div className="thumbnail-forms">
		<List
			className="thumbnail-forms-list"
			style={{
				height: `${forms.length}00vh`,
				top: `calc(-${currentSlide} * (var(--vh, 1vh) * 100))`,
			}}
		>
			{forms.map(({ decorativeForm, id }, index) => (
				<ListElement
					className={`thumbnail-form ${index === currentSlide ? 'active' : ''}`}
					key={id}
				>
					<Image src={decorativeForm} width="300" height="300" layout="fixed" />
				</ListElement>
			))}
		</List>
	</div>
)

ThumbnailsForms.propTypes = {
	forms: PropTypes.arrayOf(
		PropTypes.shape({
			decorativeForm: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,
	currentSlide: PropTypes.number.isRequired,
}

export default ThumbnailsForms
