module.exports = {
	// Run ESLint on changes to JavaScript/TypeScript files
	'**/*.js?(x)': (filenames) => `npm run lint ${filenames.join(' ')}`,
}
