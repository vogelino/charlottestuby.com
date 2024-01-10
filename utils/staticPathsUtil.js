const matter = require('gray-matter')
const { getSorterByKey, mapWork } = require('./mapUtil')
const probe = require('probe-image-size')

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
	const work = mapWork(Object.assign({}, data, { slug }))
	const imagesWithSizes = await Promise.all(
		work.images.map(async (image) => {
			const imageInfo = fs.createReadStream(path.join(process.cwd(), 'public', image.image))
			const probedImg = await probe(imageInfo)
			return {
				...image,
				width: probedImg.width,
				height: probedImg.height,
			}
		})
	)
	return {
		...work,
		images: imagesWithSizes,
	}
}

module.exports.getWorkContentBySlug = getWorkContentBySlug
module.exports.getAllWorksContents = async () => {
	const fs = require('fs')
	const worksPath = getWorksPath()

	const paths = fs.readdirSync(worksPath)
	const works = await Promise.all(
		paths.map((file) => getWorkContentBySlug(markdowmFilepathToSlug(file)))
	)

	return works.sort(getSorterByKey('order'))
}
