import React from 'react'
import PropTypes from 'prop-types'
import ListElement from './ListElement'

const List = ({ children, ...rest }) => <ul {...rest}>{children}</ul>

List.propTypes = {
	children: PropTypes.arrayOf(PropTypes.shape(ListElement.propTypes)),
}

export default List
