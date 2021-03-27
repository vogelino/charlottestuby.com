import { useEffect } from 'react'

const initCMS = async () => {
	const CMS = await import('netlify-cms-app').then((module) => module.default)
	const uploadcare = await import('netlify-cms-media-library-uploadcare').then(
		(module) => module.default
	)
	const cloudinary = await import('netlify-cms-media-library-cloudinary').then(
		(module) => module.default
	)

	const AboutPagePreview = await import('./preview-templates/AboutPagePreview').then(
		(module) => module.default
	)
	const PressPagePreview = await import('./preview-templates/PressPagePreview').then(
		(module) => module.default
	)
	const WorkPreview = await import('./preview-templates/WorkPreview').then(
		(module) => module.default
	)

	CMS.init()

	CMS.registerMediaLibrary(uploadcare)
	CMS.registerMediaLibrary(cloudinary)

	CMS.registerPreviewTemplate('about', AboutPagePreview)
	CMS.registerPreviewTemplate('press', PressPagePreview)
	CMS.registerPreviewTemplate('work', WorkPreview)
}

const NetlifyCMS = () => {
	useEffect(() => {
		initCMS()
	}, [])

	return null
}

export default NetlifyCMS
