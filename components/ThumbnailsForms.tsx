import { FC } from 'react'
import List from './List'
import ListElement from './ListElement'
import Image from 'next/image'
import { FormType } from '../types'

interface ThumbnailsFormsType {
	forms: FormType[]
	currentSlide: number
}

const ThumbnailsForms: FC<ThumbnailsFormsType> = ({ forms = [], currentSlide = 0 }) => (
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
					<Image alt="" src={decorativeForm} width="300" height="300" />
				</ListElement>
			))}
		</List>
	</div>
)

export default ThumbnailsForms
