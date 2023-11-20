import { FC, ReactNode } from 'react'
import Link from '../Link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export interface FormType {
	image: string
	posX: number
	posY: number
}

interface ImageType {
	projectImage: string
	startX: number
	startY: number
	endX: number
	endY: number
}

export interface ProjectType {
	projectTitle: string
	projectDescription: string
	textStartX: number
	textStartY: number
	textEndX: number
	textEndY: number
	projectButtonText: string | null
	projectButtonLink: string | null

	projetImages: ImageType[]
}

export interface StubyAndFischerPageType {
	title: string
	text: ReactNode
	introImage: string | null
	buttonText: string | null
	buttonLink: string | null
	projects: ProjectType[]
}

const StubyAndFischer: FC<StubyAndFischerPageType> = ({
	title = '',
	text = '',
	introImage = null,
	buttonText = null,
	buttonLink = null,
	projects = [],
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
					<div className="intro-button-container">
						<Link className="btn" href={buttonLink}>
							{buttonText}
						</Link>
					</div>
				)}
			</section>
			{introImage && (
				<section className="intro-picture">
					<Image alt="" src={introImage} width={1328} height={1340} />
				</section>
			)}
		</div>
		{projects.map((project, index) => (
			<section className="project" key={`project-${index}`}>
				<header
					className="project-text"
					style={{
						gridColumnStart: project.textStartX,
						gridRowStart: project.textStartY,
						gridColumnEnd: project.textEndX,
						gridRowEnd: project.textEndY,
					}}
				>
					<h2>{project.projectTitle}</h2>
					<p>{project.projectDescription}</p>
				</header>
			</section>
		))}
	</>
)

export default StubyAndFischer
