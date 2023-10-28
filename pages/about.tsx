import { FC } from 'react'
import Layout from '../components/Layout'
import About from '../components/pages/About'
import { attributes, react as MarkdownContent } from '../content/about.md'
import { AboutFormType } from 'types'

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
	forms: AboutFormType[]
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
	} = attributes as unknown as AboutPageType

	return (
		<Layout page="/about">
			<About
				title={title}
				subtitle={subtitle}
				text={<MarkdownContent />}
				emailAddress={email}
				emailButtonText={emailButtonText}
				cvUrl={cv}
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
