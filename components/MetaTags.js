import Head from 'next/head'
import React from 'react'
import useSiteMetadata from './SiteMetadata'

const MetaTags = () => {
	const { title, description, keywords = [], siteUrl } = useSiteMetadata()
	const SOCIAL_THUMBNAIL = `${siteUrl || 'https://localhost:3000'}/img/social-thumbnail.jpg`

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

			<link rel="author" href="https://www.vogelino.com" />
			<link rel="stylesheet" href="/styles/reset.css" />
			<link rel="stylesheet" href="/styles/fonts.css" />
			<link rel="stylesheet" href="/styles/animations.css" />
			<link rel="stylesheet" href="/styles/common.css" />
		</Head>
	)
}

export default MetaTags
