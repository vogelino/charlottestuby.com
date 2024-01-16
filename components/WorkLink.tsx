import { FC } from 'react'
import Link from './Link'
import Icon from './Icon'
import { Image } from './Image'

interface WorkLinkType {
	title: string
	slug: string
	thumbnail: string
}

const WorkLink: FC<WorkLinkType> = ({ title, slug, thumbnail }) => (
	<Link href={`/work/${slug}`} className="work-link">
		<div className="work-link-image">
			<Image
				src={thumbnail}
				alt={`Thumbnail of ${title}`}
				width="60"
				height="60"
				style={{
					objectFit: 'cover',
				}}
			/>
		</div>
		<div className="work-link-content">
			<h3>{title}</h3>
			<Icon iconId="arrow-right" />
		</div>
	</Link>
)

export default WorkLink
