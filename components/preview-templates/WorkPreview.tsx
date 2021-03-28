import { FC } from 'react'
import WorkTemplate from '../pages/Work'
import Layout from '../Layout'
import { WorkType } from '../../types'

interface WorkPreviewType {
	entry: {
		getIn: (path: string[]) => unknown
	}
}

const WorkPreview: FC<WorkPreviewType> = ({ entry }) => (
	<Layout page={`/work/${entry.getIn(['slug'])}`} isPreview>
		<WorkTemplate
			work={{
				id: entry.getIn(['slug']) as string,
				title: entry.getIn(['data', 'title']) as string,
				subtitle: entry.getIn(['data', 'subtitle']) as string,
				description: entry.getIn(['data', 'description']) as string,
				slug: entry.getIn(['slug']) as string,
				images: (entry.getIn(['data', 'images']) as { toJS: () => WorkType['images'] }).toJS(),
			}}
		/>
	</Layout>
)

export default WorkPreview
