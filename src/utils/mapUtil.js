const mapImage = (img) => {
	const url = img && img.relativePath ? `/img/${img.relativePath}` : ''
	if (url && !img.childImageSharp) return url
	return {
		...(img ? img.childImageSharp || {} : {}),
		url,
	}
}

export const mapForms = (works) =>
	works.map(({ id, decorativeForm }) => ({
		...decorativeForm,
		id: `form-${id}`,
	}))

export const mapWork = ({ id, fields, frontmatter }) => ({
	id: id,
	title: frontmatter.title,
	subtitle: frontmatter.subtitle,
	description: frontmatter.description,
	slug: fields.slug,
	images: (frontmatter.images || []).map((img) => ({
		...mapImage(img.image),
		caption: img.caption,
	})),
	order: frontmatter.orderOfAppearance,
	decorativeForm: mapImage(frontmatter.decorativeForm),
	thumbnail: mapImage(frontmatter.thumbnail),
})

const getSorterByKey = (key) => (a, b) => {
	if (a[key] < b[key]) {
		return -1
	}
	if (a[key] > b[key]) {
		return 1
	}
	return 0
}

export const mapWorks = ({ allMarkdownRemark: { edges: works } }) =>
	works.map(({ node }) => mapWork(node)).sort(getSorterByKey('order'))
