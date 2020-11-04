const getWindowDimensionByKeyWord = (keyword) => {
	const dimension = window[`inner${keyword}`]
	const { documentElement, body } = document
	return dimension || (documentElement || body)[`client${keyword}`] || 'auto'
}

export const getWindowSize = () => ({
	height: getWindowDimensionByKeyWord('Height'),
	width: getWindowDimensionByKeyWord('Width'),
})

export const getWindowScrollTop = () => {
	const { body, documentElement } = document
	const { pageYOffset } = window
	return pageYOffset !== undefined
		? pageYOffset
		: (documentElement || body.parentNode || body).scrollTop
}
