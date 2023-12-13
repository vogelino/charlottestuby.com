import { FC } from 'react'
import Link from './Link'
import { SplideSlide } from '@splidejs/react-splide'
import { Image } from './Image'

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
