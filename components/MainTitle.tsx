import { FC } from 'react'

const MainTitle: FC = ({ children, ...rest }) => <h1 {...rest}>{children}</h1>

export default MainTitle
