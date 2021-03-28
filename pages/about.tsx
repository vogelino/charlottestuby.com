import { FC } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import About from '../components/pages/About'
import { attributes, react as MarkdownContent } from '../content/about.md'

interface AboutPageType {
	title: string
	subtitle: string
	email: string
	emailButtonText: string
	cv: string
	cvButtonText: string
	instagramUsername: string
	instagramButtonText: string
	portrait: string
	forms: string[]
}

const AboutPage: FC<AboutPageType> = () => {
	const {
		title,
		subtitle,
		email,
		emailButtonText,
		cv,
		cvButtonText,
		instagramUsername,
		instagramButtonText,
		portrait,
		forms,
	} = attributes

	return (
		<Layout page="/about">
			<Head>
				<link rel="stylesheet" href="/styles/about.css" />
			</Head>
			<About
				title={title}
				subtitle={subtitle}
				text={<MarkdownContent />}
				emailAddress={email}
				emailButtonText={emailButtonText}
				cvUrl={cv.publicURL}
				cvButtonText={cvButtonText}
				instagramUsername={instagramUsername}
				instagramButtonText={instagramButtonText}
				portrait={portrait}
				forms={forms}
			/>
		</Layout>
	)
}

export default AboutPage
