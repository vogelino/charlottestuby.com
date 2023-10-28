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
		return config
	},
}
