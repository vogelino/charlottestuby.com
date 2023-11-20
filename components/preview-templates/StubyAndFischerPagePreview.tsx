import { FC, useEffect } from 'react'
import Layout from '../Layout'
import StubyAndFischer, { ProjectType } from '@components/pages/StubyAndFischer'

interface StubyAndFischerPagePreviewType {
	entry: {
		getIn: (path: string[]) => unknown
	}
	document: Document
}

const StubyAndFischerPagePreview: FC<StubyAndFischerPagePreviewType> = ({
	document: doc,
	entry,
}) => {
	useEffect(() => {
		doc.body.classList.add('stuby-and-fischer')
	}, [doc])
	const projects = entry.getIn(['data', 'projects']) as { toJS: () => ProjectType[] }
	return (
		<Layout page="/stuby-and-fischer" isPreview>
			<StubyAndFischer
				title={entry.getIn(['data', 'title']) as string}
				text={entry.getIn(['data', 'body']) as string}
				introImage={entry.getIn(['data', 'introImage']) as string}
				buttonText={entry.getIn(['data', 'introButtonText']) as string}
				buttonLink={entry.getIn(['data', 'introButtonLink']) as string}
				projects={projects.toJS()}
			/>
		</Layout>
	)
}

export default StubyAndFischerPagePreview
