import React from 'react'
import PropTypes from 'prop-types'

const ListElement = ({ children, ...rest }) => <li {...rest}>{children}</li>

ListElement.propTypes = {
	children: PropTypes.any,
}

export default ListElement
