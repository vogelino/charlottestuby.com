import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(pageProps: { dangerousAsPath: string }) {
	return (
		<Html lang="en">
			<Head />
			<body className={pageProps.dangerousAsPath.replace('/', '') || 'works'}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
