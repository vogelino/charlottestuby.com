module.exports.mapWork = ({
	title,
	subtitle,
	description,
	slug,
	images,
	orderOfAppearance,
	decorativeForm,
	thumbnail,
}) => ({
	id: slug,
	title: title,
	subtitle: subtitle,
	description: description,
	slug: slug,
	images: (images || []).map((img) => img),
	order: orderOfAppearance,
	decorativeForm: decorativeForm,
	thumbnail: thumbnail,
})

module.exports.getSorterByKey = (key) => (a, b) => {
	if (a[key] < b[key]) {
		return -1
	}
	if (a[key] > b[key]) {
		return 1
	}
	return 0
}
