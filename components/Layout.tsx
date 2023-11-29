import { FC, useEffect } from 'react'
import Navigation from './Navigation'
import ThumbnailsForms from './ThumbnailsForms'
import MetaTags from './MetaTags'
import Header from './Header'
import { FormType } from '../types'

interface TemplateWrapperType {
	page?: string
	currentSlideIndex?: number
	forms?: FormType[]
	isPreview?: boolean
	children: React.ReactNode
}

const getPageClass = (page: string): string => {
	if (page.startsWith('/work/')) return 'work without-navs'
	if (page.includes('about')) return 'about'
	if (page.includes('press')) return 'press'
	if (page.includes('stuby-and-fischer')) return 'stuby-and-fischer'
	return 'home'
}

const setVh = (): void => {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const TemplateWrapper: FC<TemplateWrapperType> = ({
	children,
	page = '',
	currentSlideIndex = 0,
	forms = [],
	isPreview = false,
}) => {
	useEffect(() => {
		setVh()
		window.addEventListener('resize', setVh)

		return () => window.removeEventListener('resize', setVh)
	}, [page])

	return (
		<main className={`website-main ${getPageClass(page)}`}>
			{!isPreview && <MetaTags />}
			{!page.startsWith('/work/') && <Header />}
			<article>
				{!page.startsWith('/work/') && !isPreview && (
					<Navigation page={page.replace('/', '')} isPreview={isPreview} />
				)}
				<section className="content">{children}</section>
				{page.startsWith('/stuby-and-fischer') && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="176"
						height="44"
						fill="none"
						className="floating-form"
					>
						<path
							fill="red"
							d="M110 0h22v22h-22zM154 0h22v22h-22zM88 22h22v22H88zM132 22h22v22h-22zM22 0h22v22H22zM66 0h22v22H66zM0 22h22v22H0zM44 22h22v22H44z"
						/>
					</svg>
				)}
			</article>
			{page === '/' && <ThumbnailsForms currentSlide={currentSlideIndex} forms={forms} />}
		</main>
	)
}

export default TemplateWrapper
