const siteMetadata = {
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

module.exports = {
	siteMetadata,
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-relative-images',
						options: {
							name: 'uploads',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {
							destinationDir: 'static',
						},
					},
				],
			},
		},
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-robots-txt`,
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: siteMetadata.description,
				short_name: siteMetadata.title,
				start_url: '/',
				background_color: '#014ce3',
				display: 'standalone',
				icon: 'src/img/Icon.png',
			},
		},
		`gatsby-plugin-preload-fonts`,
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
}
