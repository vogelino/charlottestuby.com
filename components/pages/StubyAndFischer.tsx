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
					<Image alt="" src={introImage} width={664} height={670} sizes="540px" priority />
				</section>
			)}
		</div>
		{projects.map((project, index) => {
			const items = [
				...(project.projetImages || []),
				{
					startX: project.textStartX,
					startY: project.textStartY,
					endX: project.textEndX,
					endY: project.textEndY,
				},
			]
			const validItems = filterValidGridItem(items)
			const initialLastRow = Math.max(...validItems.map((image) => image.endY))
			const normalizedItems = items.map((item) => normalizeStartEnd(item, initialLastRow))
			const finalLastRow = Math.max(...normalizedItems.map((image) => image.endY))
			const projectPos = normalizeStartEnd(
				{
					startX: project.textStartX ?? null,
					startY: project.textStartY ?? null,
					endX: project.textEndX ?? null,
					endY: project.textEndY ?? null,
				},
				initialLastRow
			)
			return (
				<section
					className="project"
					key={`project-${index}`}
					style={{
						// @ts-ignore
						'--height': `calc(var(--grid-size, 8vmin) * ${
							showPreviewGrid ? finalLastRow || 3 : finalLastRow
						})`,
					}}
				>
					<header
						className="project-text"
						style={{
							gridColumnStart: projectPos.startX + 1,
							gridRowStart: projectPos.startY + 1,
							gridColumnEnd: projectPos.endX + 1,
							gridRowEnd: projectPos.endY + 1,
						}}
					>
						<h2>{project.projectTitle}</h2>
						<ReactMarkdown>{project.projectDescription}</ReactMarkdown>
						{project.projectButtonText && project.projectButtonLink && (
							<footer>
								<Link className="btn" href={project.projectButtonLink}>
									{project.projectButtonText}
								</Link>
							</footer>
						)}
					</header>
					{(project.projetImages || []).map((image, index) => {
						const imagePos = normalizeStartEnd(image, initialLastRow)
						const validPos = imagePos as ValidGridItem
						const aspectratioW = validPos.endX - validPos.startX
						const aspectratioH = validPos.endY - validPos.startY
						const orientation = aspectratioW > aspectratioH ? 'landscape' : 'portrait'
						const aspectratio =
							orientation === 'portrait' ? aspectratioW / aspectratioH : aspectratioH / aspectratioW
						const heightInPercent = aspectratio * 100
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
									'--aspectratio': `${aspectratioW}/${aspectratioH}`,
									background:
										showPreviewGrid && !image.projectImage
											? `var(--loadingplaceholder, #e6e6ff) url(${newBg.src}) repeat center center`
											: '',
									paddingBottom: `${heightInPercent}%`,
								}}
							>
								{image.projectImage && (
									<Image
										alt=""
										src={image.projectImage}
										fill
										sizes="1100px"
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
							{[...Array((finalLastRow || 3) + 1)].map((_, index) => (
								<div
									key={`preview-grid-row-${index}`}
									className="preview-grid-row"
									style={{
										// @ts-ignore
										'--offset': `calc((var(--height, 8vmin) / ${finalLastRow || 3}) * ${index})`,
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

function normalizeStartEnd(item: ValidGridItem, lastRow: number): ValidGridItem {
	const startX = typeof item.startX === 'number' ? item.startX : 0
	const startY = typeof item.startY === 'number' ? item.startY : lastRow
	return {
		startX,
		startY,
		endX: typeof item.endX === 'number' ? item.endX : startX ? startX + 1 : 0,
		endY: typeof item.endY === 'number' ? item.endY : startY ? startY + 1 : lastRow,
	}
}

export default StubyAndFischer
