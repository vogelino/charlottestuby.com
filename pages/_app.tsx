import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from 'react'
import '../public/styles/animations.css'
import '../public/styles/reset.css'
import '../public/styles/fonts.css'
import '../public/styles/common.css'
import '../public/styles/index.css'
import '../public/styles/about.css'
import '../public/styles/stubyAndFischer.css'
import '../public/styles/work.css'
import '../public/styles/press.css'
import '../public/styles/404.css'
import { useRouter } from 'next/router'
import { getPageClass } from '@utils/pageUtil'

function MyApp({ Component, pageProps }: AppProps): ReactNode {
	const { asPath } = useRouter()

	useEffect(() => {
		document.body.className = getPageClass(asPath)
	}, [asPath])

	return <Component {...pageProps} />
}

export default MyApp
