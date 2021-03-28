const useSiteMetadata = (): {
	title: string
	description: string
	keywords: string[]
	siteUrl: string
} => {
	return {
		title: 'Portfolio website of Charlotte Stuby',
		description:
			'Charlotte Stuby is a swiss artist based in Brussels. Her practice focuses mainly on objects and installations produced by varied materials such as concrete, wood, metal but mostly sewing and embroidery. This is the Github repository of her portfolio website.',
		keywords: [
			'Charlotte',
			'Stuby',
			'Artist',
			'Tissage',
			'Textile',
			'Sculpture',
			'Installation',
			'Dessin',
			'Photo',
			'Switzerland',
			'Colors',
			'Vevey',
			'Bruxelles',
			'Vienne',
		],
		siteUrl: process.env.VERCEL_URL || `https://charlottestuby.com`,
	}
}

export default useSiteMetadata
