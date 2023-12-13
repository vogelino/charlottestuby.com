import { FC, ReactNode } from 'react'
import InternalLink from 'next/link'

interface LinkType extends Partial<typeof InternalLink> {
	href: string
	className?: string
	target?: string
	children?: ReactNode
}

const Link: FC<LinkType> = ({ children, href, className, target }) => {
	const linkClassName = `${href === '#' ? 'empty-link' : ''} ${className}`
	if (href.startsWith('/')) {
		return (
			<InternalLink href={`${href}#__next`} className={linkClassName} target={target || undefined}>
				{children}
			</InternalLink>
		)
	}
	return (
		<a rel="noopener noreferrer" target={target || '__blank'} href={href} className={linkClassName}>
			{children}
		</a>
	)
}

export default Link
