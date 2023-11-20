import { FC } from 'react'
import Layout from '../components/Layout'
import StubyAndFischer, { StubyAndFischerPageType } from '../components/pages/StubyAndFischer'
import { attributes, react as MarkdownContent } from '../content/stubyAndFischer.md'

const StubyAndFischerPage: FC<StubyAndFischerPageType> = () => {
	const { title, introButtonLink, introButtonText, introImage, projects } =
		attributes as unknown as StubyAndFischerPageType

	console.log(projects)
	return (
		<Layout page="/stuby-and-fischer">
			<StubyAndFischer
				title={title}
				text={<MarkdownContent />}
				introButtonLink={introButtonLink}
				introButtonText={introButtonText}
				introImage={introImage}
				projects={projects}
			/>
		</Layout>
	)
}

export default StubyAndFischerPage
