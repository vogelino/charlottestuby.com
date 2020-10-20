import React from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

/* eslint-disable camelcase */
/* eslint-disable max-len */
// prettier-ignore
const SOCIAL_THUMBNAIL = `${withPrefix('/')}images/social-thumbnail.jpg`
// prettier-ignore
const APPLE_TOUCH_ICON_57x57 = `${withPrefix('/')}images/favicons/apple-touch-icon-57x57.png`
// prettier-ignore
const APPLE_TOUCH_ICON_60x60 = `${withPrefix('/')}images/favicons/apple-touch-icon-60x60.png`
// prettier-ignore
const APPLE_TOUCH_ICON_72x72 = `${withPrefix('/')}images/favicons/apple-touch-icon-72x72.png`
// prettier-ignore
const APPLE_TOUCH_ICON_76x76 = `${withPrefix('/')}images/favicons/apple-touch-icon-76x76.png`
// prettier-ignore
const APPLE_TOUCH_ICON_114x114 = `${withPrefix('/')}images/favicons/apple-touch-icon-114x114.png`
// prettier-ignore
const APPLE_TOUCH_ICON_120x120 = `${withPrefix('/')}images/favicons/apple-touch-icon-120x120.png`
// prettier-ignore
const APPLE_TOUCH_ICON_144x144 = `${withPrefix('/')}images/favicons/apple-touch-icon-144x144.png`
// prettier-ignore
const APPLE_TOUCH_ICON_152x152 = `${withPrefix('/')}images/favicons/apple-touch-icon-152x152.png`
// prettier-ignore
const APPLE_TOUCH_ICON_180x180 = `${withPrefix('/')}images/favicons/apple-touch-icon-180x180.png`
// prettier-ignore
const FAVICON_16x16 = `${withPrefix('/')}images/favicons/favicon-16x16.png`
// prettier-ignore
const FAVICON_32x32 = `${withPrefix('/')}images/favicons/favicon-32x32.png`
// prettier-ignore
const FAVICON_96x96 = `${withPrefix('/')}images/favicons/favicon-96x96.png`
// prettier-ignore
const FAVICON_ICO = `${withPrefix('/')}images/favicons/favicon.ico`
// prettier-ignore
const ANDROID_CHROME_192x192 = `${withPrefix('/')}images/favicons/android-chrome-192x192.png`
// prettier-ignore
const SAFARI_PINNED_TAB = `${withPrefix('/')}images/favicons/safari-pinned-tab.svg`
/* eslint-enable camelcase */
/* eslint-disable max-len */

const MetaTags = () => {
	const { title, description, keywords = [] } = useSiteMetadata()

	return (
		<Helmet>
			<html lang="en" />
			<title>{title}</title>

			<meta name="description" content={description} />

			<meta property="og:type" content="article" />

			<meta name="theme-color" content="#014ce3" />

			<meta name="keywords" content={keywords.join(', ')} />
			<meta name="news_keywords" content={keywords.join(', ')} />

			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>

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
			<meta property="og:url" content={withPrefix('/')} />
			<meta property="og:image" content={SOCIAL_THUMBNAIL} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={title} />

			<meta property="fb:appid" content="186064998091648" />
			<meta property="fb:admins" content="1308822218" />

			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href={APPLE_TOUCH_ICON_57x57}
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href={APPLE_TOUCH_ICON_60x60}
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href={APPLE_TOUCH_ICON_72x72}
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href={APPLE_TOUCH_ICON_76x76}
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href={APPLE_TOUCH_ICON_114x114}
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href={APPLE_TOUCH_ICON_120x120}
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href={APPLE_TOUCH_ICON_144x144}
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href={APPLE_TOUCH_ICON_152x152}
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href={APPLE_TOUCH_ICON_180x180}
			/>

			<link
				rel="icon"
				type="image/png"
				href={FAVICON_16x16}
				sizes="16x16"
			/>
			<link
				rel="icon"
				type="image/png"
				href={FAVICON_32x32}
				sizes="32x32"
			/>
			<link
				rel="icon"
				type="image/png"
				href={FAVICON_96x96}
				sizes="96x96"
			/>
			<link rel="shortcut icon" href={FAVICON_ICO} />
			<link
				rel="icon"
				type="image/png"
				href={ANDROID_CHROME_192x192}
				sizes="192x192"
			/>
			<link rel="mask-icon" href={SAFARI_PINNED_TAB} color="#014ce3" />

			<link rel="manifest" href="/manifest.json" />

			<link rel="author" href="https://www.vogelino.com" />

			<link rel="stylesheet" href="/styles.css" />
		</Helmet>
	)
}

export default MetaTags
