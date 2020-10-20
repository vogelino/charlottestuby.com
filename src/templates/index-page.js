import React from 'react'
// import PropTypes from "prop-types";

import Layout from '../components/Layout'
import WorkRoll from '../components/WorkRoll'

export const IndexPageTemplate = () => <WorkRoll />

IndexPageTemplate.propTypes = {}

const IndexPage = () => (
	<Layout page="/">
		<IndexPageTemplate />
	</Layout>
)

IndexPage.propTypes = {}

export default IndexPage
