import { FC, ReactNode } from 'react'

const AdditionalInfo: FC<{ children: ReactNode }> = ({ children, ...rest }) => (
	<small {...rest}>{children}</small>
)

export default AdditionalInfo
