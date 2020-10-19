import React from 'react'
import PropTypes from 'prop-types'
import { WorkTemplate } from '../../templates/work'

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <WorkTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
