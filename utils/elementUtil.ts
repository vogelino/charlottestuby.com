const getWindowDimensionByKeyWord = (keyword: 'Width' | 'Height'): string => {
	const dimension = keyword === 'Width' ? window.innerWidth : window.innerHeight
	const { documentElement, body } = document
	const base = documentElement || body
	const baseProp = keyword === 'Width' ? base.clientWidth : base.clientHeight
	return String(dimension || baseProp || 'auto')
}

export const getWindowSize = (): { width: string; height: string } => ({
	height: getWindowDimensionByKeyWord('Height'),
	width: getWindowDimensionByKeyWord('Width'),
})

export const getWindowScrollTop = (): number => {
	const { body, documentElement } = document
	const { pageYOffset } = window
	return pageYOffset !== undefined
		? pageYOffset
		: (documentElement || body.parentNode || body).scrollTop
}
