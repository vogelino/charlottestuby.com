import { FC } from 'react'
import WorksPage from '@components/pages/Works'
import { getAllWorksContents } from '@utils/staticPathsUtil'
import { WorkType } from '../types'
import '@splidejs/react-splide/css/core'

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
