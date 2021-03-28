import Head from 'next/head'
import { FC } from 'react'
import useSiteMetadata from './SiteMetadata'

const MetaTags: FC = () => {
	const { title, description, keywords = [], siteUrl } = useSiteMetadata()
	const SOCIAL_THUMBNAIL = `${siteUrl || 'https://localhost:3000'}/social-thumbnail.jpg`

	return (
		<Head>
			<title>{title}</title>

			<meta name="description" content={description} />

			<meta property="og:type" content="article" />

			<meta name="theme-color" content="#014ce3" />

			<meta name="keywords" content={keywords.join(', ')} />
			<meta name="news_keywords" content={keywords.join(', ')} />

			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta itemProp="name" content={title} />
			<meta itemProp="description" content={description} />

			<meta itemProp="image" content={SOCIAL_THUMBNAIL} />

			<meta name="twitter:card" content={SOCIAL_THUMBNAIL} />
			<meta name="twitter:image" content={SOCIAL_THUMBNAIL} />
			<meta name="twitter:site" content="article" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:creator" content="@soyvogelino" />

			<meta property="og:title" content={title} />
			<meta property="og:type" content="article" />
			<meta property="og:locale" content="en" />
			<meta property="og:url" content={siteUrl} />
			<meta property="og:image" content={SOCIAL_THUMBNAIL} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={title} />

			<meta property="fb:appid" content="186064998091648" />
			<meta property="fb:admins" content="1308822218" />

			<link rel="sitemap" type="application/xml" href="/sitemap.xml" />

			<link rel="author" href="https://www.vogelino.com" />

			<link href="/favicon.ico" type="image/x-icon" rel="shortcut icon" />
			<link href="/favicons/android-chrome-192x192.png" type="image/png" rel="icon" />
			<link href="/favicons/android-chrome-512x512.png" type="image/png" rel="icon" />
			<link href="/favicons/favicon-16x16.png" type="image/png" rel="icon" />
			<link href="/favicons/favicon-32x32.png" type="image/png" rel="icon" />
			<link href="/favicons/apple-touch-icon.png" type="image/png" rel="apple-touch-icon" />
		</Head>
	)
}

export default MetaTags
