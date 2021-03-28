import { FC } from 'react'
import WorksPage from '@components/pages/Works'
import { getAllWorksContents } from '@utils/staticPathsUtil'

interface WorkType {
	id: string
	title: string
	subtitle: string
	description: string
	slug: string
	images: string[]
	order: number
	decorativeForm: string
	thumbnail: string
}

interface WorksPageType {
	works: WorkType[]
}

export const getStaticProps = async (): Promise<{
	props: WorksPageType
}> => {
	const works = await getAllWorksContents()
	return { props: { works } }
}

const IndexPage: FC<WorksPageType> = ({ works }) => <WorksPage works={works} forms={works} />

export default IndexPage
