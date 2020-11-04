import React from 'react'
import PropTypes from 'prop-types'
import GatsbyImg from 'gatsby-image'

export default function Image({
	fluid,
	fixed,
	relativePath = '',
	url = '',
	...rest
}) {
	if (relativePath || url) {
		return (
			<img src={relativePath ? `/img/${relativePath}` : url} {...rest} />
		)
	}

	return <GatsbyImg fluid={fluid} fixed={fixed} {...rest} />
}

Image.propTypes = {
	relativePath: PropTypes.string,
	fluid: PropTypes.object,
	fixed: PropTypes.object,
	url: PropTypes.string,
}
