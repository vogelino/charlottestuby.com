module.exports = {
	siteMetadata: {
		title: 'Portfolio of Charlotte Stuby',
		description:
			'A swiss artist based in Brussels specialized in textile work',
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
	},
	plugins: [
		'gatsby-plugin-react-helmet',
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
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
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

		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'charlottestuby',
				icons: [
					{
						src: 'images/favicons/android-chrome-36x36.png',
						sizes: '36x36',
						type: 'image/png',
						density: 0.75,
					},
					{
						src: 'images/favicons/android-chrome-48x48.png',
						sizes: '48x48',
						type: 'image/png',
						density: 1,
					},
					{
						src: 'images/favicons/android-chrome-72x72.png',
						sizes: '72x72',
						type: 'image/png',
						density: 1.5,
					},
					{
						src: 'images/favicons/android-chrome-96x96.png',
						sizes: '96x96',
						type: 'image/png',
						density: 2,
					},
					{
						src: 'images/favicons/android-chrome-144x144.png',
						sizes: '144x144',
						type: 'image/png',
						density: 3,
					},
					{
						src: 'images/favicons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						density: 4,
					},
				],
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
}
