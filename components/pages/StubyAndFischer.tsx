import { FC, ReactNode } from 'react'
import Link from '../Link'
import ReactMarkdown from 'react-markdown'
import { Image } from '@components/Image'

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
	showPreviewGrid?: boolean
}

const StubyAndFischer: FC<StubyAndFischerPageType> = ({
	title = '',
	text = '',
	introImage = null,
	introButtonText = null,
	introButtonLink = null,
	projects = [],
	showPreviewGrid = false,
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
		{projects.map((project, index) => {
			const lastRow = Math.max(
				project.textEndY,
				...(project.projetImages || []).map((image) => image.endY)
			)
			return (
				<section
					className="project"
					key={`project-${index}`}
					style={{
						// @ts-ignore
						'--height': `calc(var(--grid-size, 8vmin) * ${
							showPreviewGrid ? lastRow || 3 : lastRow
						})`,
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
						{project.projectButtonText && project.projectButtonLink && (
							<footer>
								<Link className="btn" href={project.projectButtonLink}>
									{project.projectButtonText}
								</Link>
							</footer>
						)}
					</header>
					{(project.projetImages || []).map((image, index) => (
						<div
							key={`project-image-${index}`}
							className="project-image"
							style={{
								position: 'relative',
								gridColumnStart: image.startX + 1,
								gridRowStart: image.startY + 1,
								gridColumnEnd: image.endX + 1,
								gridRowEnd: image.endY + 1,
								// @ts-ignore
								'--aspectRatio': `${image.endX - image.startX}/${image.endY - image.startY}`,
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
					{showPreviewGrid && (
						<div className="preview-grid">
							{[...Array((lastRow || 3) + 1)].map((_, index) => (
								<div
									key={`preview-grid-row-${index}`}
									className="preview-grid-row"
									style={{
										// @ts-ignore
										'--offset': `calc((var(--height, 8vmin) / ${lastRow || 3}) * ${index})`,
									}}
								>
									<span>{index}</span>
								</div>
							))}
							{[...Array(8)].map((_, index) => (
								<div
									key={`preview-grid-col-${index}`}
									className="preview-grid-col"
									style={{
										// @ts-ignore
										'--offset': `calc((100% / 7) * ${index})`,
									}}
								>
									<span>{index}</span>
								</div>
							))}
						</div>
					)}
				</section>
			)
		})}
	</>
)

export default StubyAndFischer
