import { FC } from 'react'
import Press from '../pages/Press'
import Layout from '../Layout'
import { PressLinkType } from '../../types'

interface PressPagePreviewType {
	entry: {
		getIn: (path: string[]) => { toJS: () => PressLinkType[] }
	}
}

const PressPagePreview: FC<PressPagePreviewType> = ({ entry }) => (
	<Layout page="/press" isPreview>
		<Press
			pressList={entry
				.getIn(['data', 'pressList'])
				.toJS()
				.map(({ title, date, url, screenshot, color }) => ({
					title,
					date,
					url,
					color,
					file: '',
					screenshot: screenshot,
				}))}
		/>
	</Layout>
)

export default PressPagePreview
