import { FC, ReactNode } from 'react'

const InteractiveText: FC<{
	onClick?: () => void
	className?: string
	children: ReactNode
}> = ({ children, ...rest }) => <a {...rest}>{children}</a>

export default InteractiveText
