import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import '../public/styles/animations.css'
import '../public/styles/reset.css'
import '../public/styles/fonts.css'
import '../public/styles/common.css'
import '../public/styles/index.css'
import '../public/styles/about.css'
import '../public/styles/work.css'
import '../public/styles/press.css'
import '../public/styles/404.css'

function MyApp({ Component, pageProps }: AppProps): ReactNode {
	return <Component {...pageProps} />
}

export default MyApp
