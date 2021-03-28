import React from 'react'
import PropTypes from 'prop-types'

const AdditionalInfo = ({ children, ...rest }) => <small {...rest}>{children}</small>

AdditionalInfo.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.node,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
}

export default AdditionalInfo
