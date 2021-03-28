import { FC } from 'react'

const InteractiveText: FC<{
	onClick?: () => void
	className?: string
}> = ({ children, ...rest }) => <a {...rest}>{children}</a>

export default InteractiveText
