import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(pageProps: { dangerousAsPath: string }) {
	const page = pageProps.dangerousAsPath.replace('/', '') || 'works'
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
