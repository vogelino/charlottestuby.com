import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Press from '../../../components/pages/Press'
import Layout from '../../../components/Layout'

const PressPagePreview = ({ entry }) => (
	<Layout page="/press" isPreview>
		<Head>
			<link rel="stylesheet" href="/styles/press.css" />
		</Head>
		<Press
			pressList={entry
				.getIn(['data', 'pressList'])
				.toJS()
				.map(({ title, date, url, screenshot, color }) => ({
					title,
					date,
					url,
					color,
					file: '',
					screenshot: screenshot,
				}))}
		/>
	</Layout>
)

PressPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default PressPagePreview
