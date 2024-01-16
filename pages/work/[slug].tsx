import { FC, useCallback, useEffect } from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'
import Layout from '../../components/Layout'
import Work from '../../components/pages/Work'
import { getAllWorksContents } from '../../utils/staticPathsUtil'
import { WorkType } from '../../types'
import { useRouter } from 'next/router'

export const getStaticPaths = async (): Promise<{ paths: string[]; fallback: boolean }> => {
	const allWorks = await getAllWorksContents()
	const paths = allWorks.map(({ slug }) => `/work/${slug}`)
	return { paths, fallback: false }
}

interface ExtendedContextType extends NextPageContext {
	params: { slug: string }
}

interface WorkPageType {
	work: WorkType
	prevWork: WorkType
	nextWork: WorkType
}

export const getStaticProps = async (
	context: ExtendedContextType
): Promise<{ props: WorkPageType }> => {
	const slug = context.params.slug
	const works = await getAllWorksContents()
	const currentWorkIdx = works.findIndex(({ slug: compareSlug }) => slug === compareSlug)
	const work = works[currentWorkIdx]

	const nextWork = works[currentWorkIdx + 1 > works.length - 1 ? 0 : currentWorkIdx + 1]
	const prevWork = works[currentWorkIdx - 1 < 0 ? works.length - 1 : currentWorkIdx - 1]

	return {
		props: { work, nextWork, prevWork },
	}
}

const WorkTemplate: FC<WorkPageType> = ({ work, nextWork, prevWork }) => {
	const router = useRouter()
	const onEscape = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			router.push('/')
		}
	}, [])

	useEffect(() => {
		window.addEventListener('keyup', onEscape)
		return () => window.removeEventListener('keyup', onEscape)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		document.body.scrollTo(0, 0)
	}, [router.asPath])

	return (
		<Layout page={`/work/${work.slug}`}>
			<Head>
				<title>{`${work.title} | Projet`}</title>
				<meta name="description" content={`${work.description}`} />
			</Head>
			<Work work={work} nextWork={nextWork} previousWork={prevWork} />
		</Layout>
	)
}

export default WorkTemplate
