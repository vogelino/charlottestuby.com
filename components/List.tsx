import { CSSProperties, FC } from 'react'

const List: FC<{
	className?: string
	style?: CSSProperties
	children: React.ReactNode
}> = ({ children, ...rest }) => <ul {...rest}>{children}</ul>

export default List
