import { FC } from 'react'
import List from './List'
import ListElement from './ListElement'

interface ThumbnailsBulletNavType {
	itemsAmount: number
	activeItemIndex: number
	setCurrentWorksSlide: (currentSlideIndex: number) => void
}

const ThumbnailsBulletNav: FC<ThumbnailsBulletNavType> = ({
	itemsAmount,
	activeItemIndex,
	setCurrentWorksSlide,
}) => (
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

export default ThumbnailsBulletNav
