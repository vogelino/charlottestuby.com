import { FC } from 'react'

const ListElement: FC<{
	onClick?: () => void
	className?: string
	children?: React.ReactNode
}> = ({ children, ...rest }) => <li {...rest}>{children}</li>

export default ListElement
