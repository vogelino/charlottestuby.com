import { FC, ReactNode } from 'react'
import Link from '../Link'
import ReactMarkdown from 'react-markdown'
import { Image } from '@components/Image'
import newBg from '../../assets/images/new-bg.svg'

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
	showTabInNav?: boolean
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
			const items = filterValidGridItem([
				...(project.projetImages || []),
				{
					startX: project.textStartX,
					startY: project.textStartY,
					endX: project.textEndX,
					endY: project.textEndY,
				},
			])
			const lastRow = Math.max(project.textEndY, ...items.map((image) => image.endY))
			const projectPos = normalizeStartEnd({
				startX: project.textStartX ?? null,
				startY: project.textStartY ?? null,
				endX: project.textEndX ?? null,
				endY: project.textEndY ?? null,
			})
			const projectHasValidPositions = isValidGridItem(projectPos)
			const validProjectPos = projectPos as ValidGridItem
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
					{projectHasValidPositions && (
						<header
							className="project-text"
							style={{
								gridColumnStart: validProjectPos.startX + 1,
								gridRowStart: validProjectPos.startY + 1,
								gridColumnEnd: validProjectPos.endX + 1,
								gridRowEnd: validProjectPos.endY + 1,
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
					)}
					{(project.projetImages || []).map((image, index) => {
						const imagePos = normalizeStartEnd(image)
						if (!isValidGridItem(imagePos)) return null
						const validPos = imagePos as ValidGridItem
						return (
							<div
								key={`project-image-${index}`}
								className="project-image"
								style={{
									position: 'relative',
									gridColumnStart: validPos.startX + 1,
									gridRowStart: validPos.startY + 1,
									gridColumnEnd: validPos.endX + 1,
									gridRowEnd: validPos.endY + 1,
									// @ts-ignore
									'--aspectRatio': `${validPos.endX - validPos.startX}/${
										validPos.endY - validPos.startY
									}`,
									background:
										showPreviewGrid && !image.projectImage
											? `var(--brandFocus, #e6e6ff) url(${newBg.src}) repeat center center`
											: '',
								}}
							>
								{image.projectImage && (
									<Image
										alt=""
										src={image.projectImage}
										fill
										style={{
											objectFit: 'cover',
										}}
									/>
								)}
							</div>
						)
					})}
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

type UnknownGridItem = {
	startX: unknown
	startY: unknown
	endX: unknown
	endY: unknown
}

type ValidGridItem = {
	startX: number
	startY: number
	endX: number
	endY: number
}

function filterValidGridItem(items: UnknownGridItem[]) {
	return items.filter(isValidGridItem) as ValidGridItem[]
}

function isValidGridItem(item: UnknownGridItem) {
	return [item.startX, item.startY, item.endX, item.endY].every(isValidGridPosition)
}

function isValidGridPosition(value: unknown) {
	return typeof value === 'number' && value >= 0
}

function normalizeStartEnd(item: ValidGridItem): {
	startX: number | null
	startY: number | null
	endX: number | null
	endY: number | null
} {
	const startX = typeof item.startX === 'number' ? item.startX : null
	const startY = typeof item.startY === 'number' ? item.startY : null
	return {
		startX,
		startY,
		endX: typeof item.endX === 'number' ? item.endX : startX ? startX + 1 : null,
		endY: typeof item.endY === 'number' ? item.endY : startY ? startY + 1 : null,
	}
}

export default StubyAndFischer
