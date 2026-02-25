import Link from 'next/link'
import { FC, useEffect } from 'react'

const AdminRedirect: FC = () => {
	useEffect(() => {
		window.location.replace('/admin/index.html')
	}, [])

	return (
		<p style={{ padding: '2rem' }}>
			Redirecting to the CMS...
			<br />
			If you are not redirected automatically, open{' '}
			<Link href="/admin/index.html">/admin/index.html</Link>.
		</p>
	)
}

export default AdminRedirect
