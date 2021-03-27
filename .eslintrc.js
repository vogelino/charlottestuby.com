module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module'
	}, // to enable features such as async/await
	ignorePatterns: ['node_modules/*', '.vercel/*', 'build/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
	plugins: ['import'],
	parser: 'babel-eslint',
	settings: {
		react: { version: 'detect' },
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended', // React rules
		'plugin:react-hooks/recommended', // React hooks rules
		'plugin:jsx-a11y/recommended', // Accessibility rules
		'plugin:prettier/recommended', // Prettier recommended rules
	],
	rules: {
		// No need to import React when using Next.js
		'react/react-in-jsx-scope': 'off',

		// This rule is not compatible with Next.js's <Link /> components
		'jsx-a11y/anchor-is-valid': 'off',

		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 'off',

		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'import/no-unresolved': 'error',
		// 'import/no-unresolved': ['error', { ignore: ['\.md$'] }],
	},
}
