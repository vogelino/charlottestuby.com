const { getAllWorksContents } = require('../utils/staticPathsUtil')
const fs = require('fs')

const createFullUrl = (path) => `https://charlottestuby.com${path}`
const formatDate = (dateStr) => {
	const date = dateStr ? new Date(dateStr) : new Date()
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

const getSitemap = (works = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl('/')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/press')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/about')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${works
		.map(
			({ slug, updatedAt }) => `
  <url>
    <loc>${createFullUrl(`/work/${slug}`)}</loc>
    <lastmod>${formatDate(updatedAt)}</lastmod>
  </url>`
		)
		.join('\n')}
</urlset>`

;(async () => {
	const works = await getAllWorksContents()
	const sitemap = getSitemap(works)
	fs.writeFileSync('public/sitemap.xml', sitemap)
})()
