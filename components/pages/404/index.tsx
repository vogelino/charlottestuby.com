import { FC } from 'react'
import Link from 'next/link'
import React from 'react'
import Layout from '../../Layout'

const NotFoundPage: FC = () => (
	<Layout page="404">
		<div className="error-page">
			<h1 className="error-title">NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist...</p>
			<br />
			<Link href="/">Try your luck on the home page!</Link>
		</div>
	</Layout>
)

export default NotFoundPage
