import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../atoms/List'
import ListElement from '../atoms/ListElement'

class ThumbnailsForms extends Component {
	constructor(props) {
		super(props)

		this.loaded = false
		this.renderForms = this.renderForms.bind(this)
	}

	componentDidMount() {
		this.loaded = true
		this.forceUpdate()
	}

	renderForms() {
		const { forms, ui, currentSlide } = this.props
		return forms.map(({ url, id }, index) => (
			<ListElement
				className={`thumbnail-form
					${index === currentSlide ? 'active' : ''}`}
				key={id}
				style={{
					width: ui.width,
					height: ui.height,
					backgroundImage: `url('${url}')`,
				}}
			/>
		))
	}

	render() {
		const { ui, currentSlide, forms } = this.props
		return (
			<div
				className="thumbnail-forms"
				style={{
					width: ui.width,
					height: ui.height,
				}}
			>
				<List
					className="thumbnail-forms-list"
					style={{
						width: ui.width,
						height: Math.max(ui.height * forms.length),
						top: -currentSlide * ui.height - 50,
					}}
				>
					{this.loaded ? this.renderForms() : null}
				</List>
			</div>
		)
	}
}

ThumbnailsForms.propTypes = {
	ui: PropTypes.object.isRequired,
	forms: PropTypes.array.isRequired,
	currentSlide: PropTypes.number.isRequired,
}

export default ThumbnailsForms
