interface WorkImageType {
	image: string
	caption?: string
	width?: number
	height?: number
}

export interface WorkType {
	id: string
	title: string
	subtitle: string
	description: string
	slug: string
	images: WorkImageType[]
	order: number
	decorativeForm: string
	thumbnail: string
}

export type FormType = Pick<WorkType, 'decorativeForm' | 'id'>

export interface AboutFormType {
	image: string
	posX: number
	posY: number
}

export interface PressLinkType {
	title: string
	date: Date
	url: string
	pdfFile?: string
	screenshot: string
	color: string
}
