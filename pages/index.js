import React from 'react'
import PropTypes from 'prop-types'

import WorksPage from '../components/pages/Works'
import { getAllWorksContents } from '../utils/staticPathsUtil'

export const getStaticProps = async () => {
	const works = await getAllWorksContents()
	return { props: { works } }
}

const IndexPage = ({ works }) => <WorksPage works={works} forms={works} />

IndexPage.propTypes = {
	works: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default IndexPage
