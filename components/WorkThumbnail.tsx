import { FC } from 'react'
import Image from 'next/image'
import Link from './Link'

interface WorkThumbnailType {
	thumbnail: string
	slug: string
}

const WorkThumbnail: FC<WorkThumbnailType> = ({ thumbnail, slug }) => (
	<Link href={`/work/${slug}`} className="work-thumbnail">
		<div className="work-thumb-wrapper">
			<Image alt="" src={thumbnail} layout="fill" objectFit="cover" />
		</div>
	</Link>
)

export default WorkThumbnail
