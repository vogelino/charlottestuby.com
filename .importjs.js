module.exports = {
	moduleNameFormatter({ pathToImportedModule }) {
		return pathToImportedModule
			.replace('./components/', '@components/')
			.replace('./utils/', '@utils/')
			.replace('./content/', '@content/')
			.replace(/\.ts$/gs, '')
	},
}
