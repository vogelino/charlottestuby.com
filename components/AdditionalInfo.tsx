import { FC } from 'react'

const AdditionalInfo: FC = ({ children, ...rest }) => <small {...rest}>{children}</small>

export default AdditionalInfo
