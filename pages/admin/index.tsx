import { FC, ReactNode, useEffect } from 'react'
import AboutPagePreview from '../../components/preview-templates/AboutPagePreview'
import PressPagePreview from '../../components/preview-templates/PressPagePreview'
import WorkPreview from '../../components/preview-templates/WorkPreview'

interface CMSType {
	init: () => void
	registerMediaLibrary: (plugin: unknown) => void
	registerPreviewStyle: (plugin: unknown) => void
	registerPreviewTemplate: (path: string, plugin: ReactNode) => void
}

const importScripts = async (): Promise<{
	CMS: CMSType
	uploadcare: unknown
	cloudinary: unknown
}> => {
	const [{ default: CMS }, { default: uploadcare }, { default: cloudinary }] = await Promise.all([
		import('decap-cms-app'),
		// @ts-ignore
		import('decap-cms-media-library-uploadcare'),
		// @ts-ignore
		import('decap-cms-media-library-cloudinary'),
	])
	return { CMS: CMS as unknown as CMSType, uploadcare, cloudinary }
}

const initCMS = async (): Promise<void> => {
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
	CMS.registerPreviewTemplate('about', AboutPagePreview as unknown as ReactNode)
	CMS.registerPreviewTemplate('press', PressPagePreview as unknown as ReactNode)
	CMS.registerPreviewTemplate('work', WorkPreview as unknown as ReactNode)
}

const NetlifyCMS: FC = () => {
	useEffect(() => {
		initCMS()
	}, [])

	return null
}

export default NetlifyCMS
