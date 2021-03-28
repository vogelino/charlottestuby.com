import { FC } from 'react'

const Paragraph: FC = ({ children, ...rest }) => <p {...rest}>{children}</p>

Paragraph.defaultProps = {
	className: {},
}

export default Paragraph
