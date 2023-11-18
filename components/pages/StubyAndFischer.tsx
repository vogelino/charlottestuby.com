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
	<>
		<div className="intro">
			<section className="intro-content">
				<h1>
					<ReactMarkdown>{title}</ReactMarkdown>
				</h1>
				<div className="intro-text">
					{typeof text === 'string' ? <ReactMarkdown>{text}</ReactMarkdown> : text}
				</div>
				{buttonText && buttonLink && (
					<Link className="btn" href={buttonLink}>
						{buttonText}
					</Link>
				)}
			</section>
			{introImage && (
				<section className="intro-picture">
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
		</div>
	</>
)

export default StubyAndFischer
