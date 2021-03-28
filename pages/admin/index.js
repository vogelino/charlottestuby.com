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

	CMS.registerPreviewStyle('/styles/reset.css')
	CMS.registerPreviewStyle('/styles/fonts.css')
	CMS.registerPreviewStyle('/styles/animations.css')
	CMS.registerPreviewStyle('/styles/common.css')
	CMS.registerPreviewStyle('/styles/about.css')
	CMS.registerPreviewStyle('/styles/press.css')
	CMS.registerPreviewStyle('/styles/work.css')
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
