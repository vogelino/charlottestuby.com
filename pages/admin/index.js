import { useEffect } from 'react'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import PressPagePreview from './preview-templates/PressPagePreview'
import WorkPreview from './preview-templates/WorkPreview'

const importScripts = async () => {
	const [{ default: CMS }, { default: uploadcare }, { default: cloudinary }] = await Promise.all([
		import('netlify-cms-app'),
		import('netlify-cms-media-library-uploadcare'),
		import('netlify-cms-media-library-cloudinary'),
	])
	return { CMS, uploadcare, cloudinary }
}

const initCMS = async () => {
	const { CMS, uploadcare, cloudinary } = await importScripts()

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
