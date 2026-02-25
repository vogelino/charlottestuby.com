import { readFile } from 'fs/promises'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const getRequestBaseURL = (req: NextApiRequest): string => {
	const forwardedProto = req.headers['x-forwarded-proto']
	const forwardedHost = req.headers['x-forwarded-host']
	const isTLS = (req.socket as { encrypted?: boolean }).encrypted
	const proto =
		typeof forwardedProto === 'string'
			? forwardedProto.split(',')[0]
			: isTLS
				? 'https'
				: 'http'
	const host =
		typeof forwardedHost === 'string'
			? forwardedHost.split(',')[0]
			: (req.headers.host ?? 'localhost:3000')
	return `${proto}://${host}`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		res.status(405).send('Method not allowed')
		return
	}

	try {
		const sourcePath = path.join(process.cwd(), 'public', 'admin', 'config.yml')
		const source = await readFile(sourcePath, 'utf8')
		const origin = getRequestBaseURL(req)

		const withDynamicBaseURL = source.replace(/^(\s*base_url:\s*).*/m, `$1'${origin}'`)

		res.setHeader('Content-Type', 'text/yaml; charset=utf-8')
		res.setHeader('Cache-Control', 'no-store')
		res.status(200).send(withDynamicBaseURL)
	} catch {
		res.status(500).send('Failed to generate admin config')
	}
}
