import { FC } from 'react'
import About from '../pages/About'
import Layout from '../Layout'
import { AboutFormType } from '../../types'

interface AboutPagePreviewType {
	entry: {
		getIn: (path: string[]) => unknown
	}
}

const AboutPagePreview: FC<AboutPagePreviewType> = ({ entry }) => (
	<Layout page="/about" isPreview>
		<About
			title={entry.getIn(['data', 'title']) as string}
			subtitle={entry.getIn(['data', 'subtitle']) as string}
			text={entry.getIn(['data', 'body']) as string}
			emailAddress={entry.getIn(['data', 'email']) as string}
			emailButtonText={entry.getIn(['data', 'emailButtonText']) as string}
			instagramButtonText={entry.getIn(['data', 'instagramButtonText']) as string}
			instagramUsername={entry.getIn(['data', 'instagramUsername']) as string}
			cvUrl={entry.getIn(['data', 'cv']) as string}
			cvButtonText={entry.getIn(['data', 'cvButtonText']) as string}
			portrait={entry.getIn(['data', 'portrait']) as string}
			forms={(entry.getIn(['data', 'forms']) as { toJS: () => AboutFormType[] }).toJS()}
		/>
	</Layout>
)

export default AboutPagePreview
