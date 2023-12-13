import { getPageClass } from '@utils/pageUtil'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(pageProps: { dangerousAsPath: string }) {
	const page = getPageClass(pageProps.dangerousAsPath)
	return (
		<Html lang="en">
			<Head />
			<body className={page}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
