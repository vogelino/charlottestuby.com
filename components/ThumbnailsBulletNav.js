import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import ListElement from './ListElement'

const ThumbnailsBulletNav = ({ itemsAmount, activeItemIndex, setCurrentWorksSlide }) => (
	<List className="thumbnails-bullet-nav">
		{Array.from(Array(itemsAmount).keys()).map((index) => (
			<ListElement
				key={index}
				onClick={() => setCurrentWorksSlide(index)}
				className={['thumbnails-bullet', index === activeItemIndex ? 'active' : ''].join(' ')}
			/>
		))}
	</List>
)

ThumbnailsBulletNav.propTypes = {
	itemsAmount: PropTypes.number.isRequired,
	setCurrentWorksSlide: PropTypes.func.isRequired,
	activeItemIndex: PropTypes.number.isRequired,
}

export default ThumbnailsBulletNav
