module.exports = {
	webpack(config, { isServer }) {
		if (isServer) {
			require('./scripts/generate-sitemap')
		}

		config.module.rules.push({
			test: /\.md$/,
			use: {
				loader: 'frontmatter-markdown-loader',
				options: { mode: ['react-component'] },
			},
		})

		// Handle node: protocol imports by resolving to the actual module
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				url: require.resolve('url/'),
			}
		}

		// Add externals to handle node: imports
		const originalExternals = config.externals || []
		config.externals = [
			...(Array.isArray(originalExternals) ? originalExternals : [originalExternals]),
			({ request }, callback) => {
				if (request.startsWith('node:')) {
					return callback(null, `commonjs ${request.replace('node:', '')}`)
				}
				callback()
			},
		]

		return config
	},
}
