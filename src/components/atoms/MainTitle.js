import React from 'react'
import PropTypes from 'prop-types'

const MainTitle = ({ children, ...rest }) => <h1 {...rest}>{children}</h1>

MainTitle.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.node,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
}

export default MainTitle
