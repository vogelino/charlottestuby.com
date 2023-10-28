import { FC } from 'react'
import Image from 'next/image'
import Link from './Link'
import { SplideSlide } from '@splidejs/react-splide'

interface WorkThumbnailType {
	thumbnail: string
	slug: string
}

const WorkThumbnail: FC<WorkThumbnailType> = ({ thumbnail, slug }) => (
	<SplideSlide>
		<Link href={`/work/${slug}`} className="work-thumbnail">
			<div className="work-thumb-wrapper">
				<Image
					alt=""
					src={thumbnail}
					fill
					sizes="100vw"
					style={{
						objectFit: 'cover',
					}}
				/>
			</div>
		</Link>
	</SplideSlide>
)

export default WorkThumbnail
