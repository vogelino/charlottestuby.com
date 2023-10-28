import { FC, ReactNode } from 'react'

const Paragraph: FC<{ children: ReactNode }> = ({ children, ...rest }) => (
	<p {...rest}>{children}</p>
)

export default Paragraph
