import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
			<li
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
				<ul
					className="thumbnail-forms-list"
					style={{
						width: ui.width,
						height: Math.max(ui.height * forms.length),
						top: -currentSlide * ui.height - 50,
					}}
				>
					{this.loaded ? this.renderForms() : null}
				</ul>
			</div>
		)
	}
}

ThumbnailsForms.propTypes = {
	ui: PropTypes.object.isRequired,
	forms: PropTypes.array.isRequired,
	currentSlide: PropTypes.number.isRequired,
}

const mapStateToProps = ({ ui, works, worksSlider }) => ({
	forms: works.items.map((item) => ({
		id: `${item.sys.id}-${item.fields.decorativeForm.sys.id}`,
		url: `https:${item.fields.decorativeForm.fields.file.url}`,
	})),
	currentSlide: worksSlider.currentSlide,
	ui,
})
export default connect(mapStateToProps)(ThumbnailsForms)
