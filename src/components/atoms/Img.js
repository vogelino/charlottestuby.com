import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Img extends Component {
	constructor(props) {
		super(props)

		this.state = { loaded: false }
	}
	handleOnLoad() {
		this.setState({ loaded: true })
	}
	render() {
		const { src, alt, className, ...rest } = this.props
		const c = (class2add) => `${className} ${class2add}`
		const loadClass = this.state.loaded ? c('loaded') : c('loading')
		return (
			<img
				{...rest}
				src={src}
				alt={alt}
				onLoad={() => this.handleOnLoad()}
				className={loadClass}
			/>
		)
	}
}

Img.defaultProps = {
	className: '',
}

Img.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
}

export default Img
