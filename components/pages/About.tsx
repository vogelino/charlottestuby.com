import { FC, ReactNode } from 'react'
import Link from '../Link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export interface FormType {
	image: string
	posX: number
	posY: number
}

export interface AboutPageType {
	title: string
	text: ReactNode
	emailAddress: string
	emailButtonText: string
	instagramUsername: string
	instagramButtonText: string
	subtitle: string
	portrait: string
	cvUrl: string
	cvButtonText: string
	forms: FormType[]
}

const About: FC<AboutPageType> = ({
	title = '',
	text = '',
	emailAddress = '',
	emailButtonText = '',
	instagramUsername = '',
	instagramButtonText = '',
	subtitle = '',
	portrait = '',
	cvUrl = '',
	cvButtonText = '',
	forms = [],
}) => (
	<div id="about-content">
		<section className="about-picture">
			<div className="img">
				<Image
					alt=""
					src={portrait}
					width="400"
					height="400"
					sizes="100vw"
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
					}}
				/>
			</div>
			<div className="about-forms">
				<div>
					{forms.map((form) => (
						<span
							key={form.image}
							className="about-form floating"
							style={{
								top: `${form.posY}vh`,
								left: `${form.posX}vw`,
							}}
						>
							<Image
								alt=""
								src={form.image}
								width="300"
								height="300"
								style={{
									objectFit: 'contain',
								}}
							/>
						</span>
					))}
				</div>
			</div>
		</section>
		<section className="about-content">
			<h1>
				<ReactMarkdown>{title}</ReactMarkdown>
			</h1>
			{subtitle && (
				<h3>
					<ReactMarkdown>{subtitle}</ReactMarkdown>
				</h3>
			)}
			<div className="about-text">
				{typeof text === 'string' ? <ReactMarkdown>{text}</ReactMarkdown> : text}
			</div>
			{cvUrl && cvButtonText && (
				<Link className="btn" href={`${cvUrl}`} target="__blank">
					{cvButtonText}
				</Link>
			)}
			{emailAddress && emailButtonText && (
				<Link className="btn" href={`mailto:${emailAddress}`}>
					{emailButtonText}
				</Link>
			)}
			{instagramUsername && instagramButtonText && (
				<Link className="btn" href={`https://instagram.com/${instagramUsername}`} target="__blank">
					{instagramButtonText}
				</Link>
			)}
		</section>
	</div>
)

export default About
