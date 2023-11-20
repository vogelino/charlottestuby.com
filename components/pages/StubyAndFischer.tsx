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
	introButtonText: string | null
	introButtonLink: string | null
	projects: ProjectType[]
}

const StubyAndFischer: FC<StubyAndFischerPageType> = ({
	title = '',
	text = '',
	introImage = null,
	introButtonText = null,
	introButtonLink = null,
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
				{introButtonText && introButtonLink && (
					<div className="intro-button-container">
						<Link className="btn" href={introButtonLink}>
							{introButtonText}
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
			<section
				className="project"
				key={`project-${index}`}
				style={{
					height: `calc(var(--grid-size, 8vmin) * ${Math.max(
						project.textEndY,
						...(project.projetImages || []).map((image) => image.endY)
					)})`,
				}}
			>
				<header
					className="project-text"
					style={{
						gridColumnStart: project.textStartX + 1,
						gridRowStart: project.textStartY + 1,
						gridColumnEnd: project.textEndX + 1,
						gridRowEnd: project.textEndY + 1,
					}}
				>
					<h2>{project.projectTitle}</h2>
					<p>{project.projectDescription}</p>
				</header>
				{(project.projetImages || []).map((image, index) => (
					<div
						key={`project-image-${index}`}
						style={{
							position: 'relative',
							gridColumnStart: image.startX + 1,
							gridRowStart: image.startY + 1,
							gridColumnEnd: image.endX + 1,
							gridRowEnd: image.endY + 1,
						}}
					>
						<Image
							alt=""
							src={image.projectImage}
							fill
							style={{
								objectFit: 'cover',
							}}
						/>
					</div>
				))}
			</section>
		))}
	</>
)

export default StubyAndFischer
