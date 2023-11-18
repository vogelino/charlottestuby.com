import { FC, ReactNode } from 'react'
import Link from '../Link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export interface FormType {
	image: string
	posX: number
	posY: number
}

export interface StubyAndFischerPageType {
	title: string
	text: ReactNode
	introImage: string | null
	buttonText: string | null
	buttonLink: string | null
}

const StubyAndFischer: FC<StubyAndFischerPageType> = ({
	title = '',
	text = '',
	introImage = null,
	buttonText = null,
	buttonLink = null,
}) => (
	<div id="stuby-and-fischer-content">
		{introImage && (
			<section className="stuby-and-fischer-picture">
				<div className="img">
					<Image
						alt=""
						src={introImage}
						width="400"
						height="400"
						sizes="100vw"
						style={{
							width: '100%',
							height: 'auto',
							objectFit: 'cover',
						}}
					/>
				</div>
			</section>
		)}
		<section className="stuby-and-fischer-content">
			<h1>
				<ReactMarkdown>{title}</ReactMarkdown>
			</h1>
			<div className="stuby-and-fischer-text">
				{typeof text === 'string' ? <ReactMarkdown>{text}</ReactMarkdown> : text}
			</div>
			{buttonText && buttonLink && (
				<Link className="btn" href={buttonLink}>
					{buttonText}
				</Link>
			)}
		</section>
	</div>
)

export default StubyAndFischer
