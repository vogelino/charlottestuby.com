import { FC } from 'react'
import Layout from '../components/Layout'
import StubyAndFischer, { StubyAndFischerPageType } from '../components/pages/StubyAndFischer'
import { attributes, react as MarkdownContent } from '../content/stubyAndFischer.md'

const StubyAndFischerPage: FC<StubyAndFischerPageType> = () => {
	const { title, buttonLink, buttonText, introImage, projects } =
		attributes as unknown as StubyAndFischerPageType

	return (
		<Layout page="/stuby-and-fischer">
			<StubyAndFischer
				title={title}
				text={<MarkdownContent />}
				buttonLink={buttonLink}
				buttonText={buttonText}
				introImage={introImage}
				projects={projects}
			/>
		</Layout>
	)
}

export default StubyAndFischerPage
