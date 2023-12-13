import { FC } from 'react'
import Link from './Link'
import ListElement from './ListElement'

interface WorkCaptionType {
	title: string
	subtitle: string
	slug: string
}

const WorkCaption: FC<WorkCaptionType> = ({ title, subtitle, slug }) => (
	<ListElement className="work-caption">
		<h2>
			<Link href={`/work/${slug}`} className="interactive">
				{title}
			</Link>
		</h2>
		<h3>{subtitle}</h3>
	</ListElement>
)

export default WorkCaption
