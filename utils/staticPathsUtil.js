const matter = require('gray-matter')
const { getSorterByKey, mapWork } = require('./mapUtil')

const getWorksPath = () => {
	const path = require('path')
	const worksPath = path.join(process.cwd(), 'content/work')
	return worksPath
}

const markdowmFilepathToSlug = (filePath) => filePath.replace(/\//g, '').replace(/\.md$/g, '')

const getWorkContentBySlug = async (slug) => {
	const path = require('path')
	const fs = require('fs')
	const worksPath = getWorksPath()
	const fileName = `${slug}.md`
	const fileContents = fs.readFileSync(path.join(worksPath, fileName), 'utf8')
	const { data } = matter(fileContents)
	return mapWork({ ...data, slug })
}

module.exports.getWorkContentBySlug = getWorkContentBySlug
module.exports.getAllWorksContents = async () => {
	const fs = require('fs')
	const worksPath = getWorksPath()

	console.log(worksPath)
	const paths = fs.readdirSync(worksPath)
	const works = await Promise.all(
		paths.map((file) => getWorkContentBySlug(markdowmFilepathToSlug(file)))
	)

	return works.sort(getSorterByKey('order'))
}
