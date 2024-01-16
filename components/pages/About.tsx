import { FC, ReactNode } from 'react'
import Link from '../Link'
import ReactMarkdown from 'react-markdown'
import { Image } from '@components/Image'

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
					alt="Photographic Portrait of Charlotte Stuby"
					src={portrait}
					width="640"
					height="640"
					sizes="640px"
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
			<div className="about-buttons">
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
					<Link
						className="btn"
						href={`https://instagram.com/${instagramUsername}`}
						target="__blank"
					>
						{instagramButtonText}
					</Link>
				)}
			</div>
		</section>
	</div>
)

export default About
