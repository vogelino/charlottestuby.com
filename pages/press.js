import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Press from '../components/pages/Press'
import { attributes } from '../content/press.md'
import useSiteMetadata from '../components/SiteMetadata'
import Head from 'next/head'

const PressPage = () => {
	const { pressList } = attributes
	const { siteUrl } = useSiteMetadata()

	return (
		<Layout page="/press">
			<Head>
				<link rel="stylesheet" href="/styles/press.css" />
			</Head>
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
