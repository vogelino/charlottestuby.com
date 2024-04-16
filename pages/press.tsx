import { FC } from 'react'
import Layout from '../components/Layout'
import useSiteMetadata from '../components/SiteMetadata'
import Press from '../components/pages/Press'
import { attributes } from '../content/press.md'
import { PressLinkType } from '../types'

const PressPage: FC = () => {
	const pressList = attributes.pressList as PressLinkType[]
	const { siteUrl } = useSiteMetadata()

	return (
		<Layout page="/press">
			<Press
				pressList={pressList.map(({ title, date, url, pdfFile, screenshot, color }) => ({
					title,
					date,
					url,
					color,
					file: pdfFile ? `${siteUrl}${pdfFile}` : '',
					screenshot: screenshot,
				}))}
			/>
		</Layout>
	)
}

export default PressPage
