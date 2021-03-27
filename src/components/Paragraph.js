import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ children, ...rest }) => <p {...rest}>{children}</p>

Paragraph.defaultProps = {
	className: {},
}

Paragraph.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.node,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
	className: PropTypes.object,
}

export default Paragraph
