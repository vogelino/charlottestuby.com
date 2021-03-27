import React from 'react'
import PropTypes from 'prop-types'
import WorkTemplate from '../../components/pages/Work'
import Layout from '../../components/Layout'
import '../../styles/css/common.css'
import '../../styles/css/work.css'

const WorkPreview = ({ entry }) => (
	<Layout page={`/work/${entry.get('slug')}`} isPreview>
		<WorkTemplate
			work={{
				id: entry.getIn(['slug']),
				title: entry.getIn(['data', 'title']),
				subtitle: entry.getIn(['data', 'subtitle']),
				description: entry.getIn(['data', 'description']),
				slug: entry.getIn(['slug']),
				images: entry
					.getIn(['data', 'images'])
					.toJS()
					.map((image) => ({
						url: image.image.replace('/img/', ''),
						caption: image.caption,
					})),
			}}
			startLoading={() => {}}
			stopLoading={() => {}}
			loading={false}
		/>
	</Layout>
)

WorkPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
		get: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default WorkPreview
