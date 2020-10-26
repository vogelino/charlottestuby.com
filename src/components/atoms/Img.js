import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

export default function Image({
	fluid = {},
	relativePath = '',
	url = '',
	...rest
}) {
	if (relativePath || url) {
		return <img src={url || `/img/${relativePath}`} {...rest} />
	}

	return <Img fluid={fluid} {...rest} />
}

Image.propTypes = {
	relativePath: PropTypes.string,
	fluid: PropTypes.object,
	url: PropTypes.string,
}
