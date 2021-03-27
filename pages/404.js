import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
	<Layout page="404">
		<Head>
			<link rel="stylesheet" href="/styles/404.css" />
		</Head>
		<div className="four-o-four">
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist...</p>
			<br />
			<Link href="/">
				<a>Try your luck on the home page!</a>
			</Link>
		</div>
	</Layout>
)

export default NotFoundPage
