import { FC, useEffect } from 'react'
import Layout from '../Layout'
import StubyAndFischer from '@components/pages/StubyAndFischer'

interface StubyAndFischerPagePreviewType {
	entry: {
		getIn: (path: string[]) => unknown
	}
}

const StubyAndFischerPagePreview: FC<StubyAndFischerPagePreviewType> = ({ entry }) => {
	useEffect(() => {
		document.body.classList.add('stuby-and-fischer')
	})
	return (
		<Layout page="/stuby-and-fischer" isPreview>
			<StubyAndFischer
				title={entry.getIn(['data', 'title']) as string}
				text={entry.getIn(['data', 'body']) as string}
				introImage={entry.getIn(['data', 'introImage']) as string}
				buttonText={entry.getIn(['data', 'introButtonText']) as string}
				buttonLink={entry.getIn(['data', 'introButtonLink']) as string}
			/>
		</Layout>
	)
}

export default StubyAndFischerPagePreview
