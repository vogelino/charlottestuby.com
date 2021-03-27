import React from 'react'
import PropTypes from 'prop-types'

const InteractiveText = ({ children, ...rest }) => <a {...rest}>{children}</a>

InteractiveText.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.node,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.arrayOf(PropTypes.element),
	]),
}

export default InteractiveText
