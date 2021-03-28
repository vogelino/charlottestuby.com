import { FC } from 'react'
import Layout from '../components/Layout'
import Press from '../components/pages/Press'
import { attributes } from '../content/press.md'
import { PressLinkType } from '../types'
import useSiteMetadata from '../components/SiteMetadata'

const PressPage: FC = () => {
	const pressList: PressLinkType[] = attributes.pressList
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
