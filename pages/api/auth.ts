import { randomBytes } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const OAUTH_STATE_COOKIE = 'decap_cms_oauth_state'
const PROVIDER = 'github'

const escapeForInlineScript = (value: string): string =>
	value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

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

const renderPopupResponse = (
	res: NextApiResponse,
	type: 'success' | 'error',
	payload: Record<string, unknown>,
): void => {
	const data = escapeForInlineScript(JSON.stringify(payload))
	const finalMessage = escapeForInlineScript(`authorization:${PROVIDER}:${type}:${data}`)

	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.status(200).send(`<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Authenticating...</title>
	</head>
	<body>
		<script>
			(function () {
				var done = false;
				var startMessage = 'authorizing:${PROVIDER}';
				var finalMessage = ${JSON.stringify(finalMessage)};

				function postToOpener(message, targetOrigin) {
					if (!window.opener) return;
					window.opener.postMessage(message, targetOrigin || '*');
				}

				window.addEventListener('message', function (event) {
					if (done || event.data !== startMessage) return;
					postToOpener(finalMessage, event.origin);
					done = true;
					setTimeout(function () { window.close(); }, 0);
				});

				postToOpener(startMessage, '*');
			})();
		</script>
	</body>
</html>`)
}

const setStateCookie = (res: NextApiResponse, value: string, secure: boolean): void => {
	const cookie = [
		`${OAUTH_STATE_COOKIE}=${value}`,
		'Path=/',
		'HttpOnly',
		'SameSite=Lax',
		'Max-Age=600',
	]

	if (secure) {
		cookie.push('Secure')
	}

	res.setHeader('Set-Cookie', cookie.join('; '))
}

const clearStateCookie = (res: NextApiResponse, secure: boolean): void => {
	const cookie = [
		`${OAUTH_STATE_COOKIE}=`,
		'Path=/',
		'HttpOnly',
		'SameSite=Lax',
		'Max-Age=0',
	]

	if (secure) {
		cookie.push('Secure')
	}

	res.setHeader('Set-Cookie', cookie.join('; '))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		res.status(405).json({ error: 'Method not allowed' })
		return
	}

	const baseURL = getRequestBaseURL(req)
	const secure = baseURL.startsWith('https://')
	const clientID = process.env.OAUTH_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID
	const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? process.env.GITHUB_CLIENT_SECRET

	const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code
	const error = Array.isArray(req.query.error) ? req.query.error[0] : req.query.error
	const errorDescription = Array.isArray(req.query.error_description)
		? req.query.error_description[0]
		: req.query.error_description

	if (error) {
		renderPopupResponse(res, 'error', {
			message: `GitHub OAuth error: ${errorDescription ?? error}`,
		})
		return
	}

	if (code) {
		const state = Array.isArray(req.query.state) ? req.query.state[0] : req.query.state
		const savedState = req.cookies[OAUTH_STATE_COOKIE]
		clearStateCookie(res, secure)

		if (!state || !savedState || state !== savedState) {
			renderPopupResponse(res, 'error', { message: 'Invalid OAuth state.' })
			return
		}

		if (!clientID || !clientSecret) {
			renderPopupResponse(res, 'error', {
				message:
					'Missing OAUTH_CLIENT_ID/OAUTH_CLIENT_SECRET (or GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET).',
			})
			return
		}

		try {
			const response = await fetch(GITHUB_TOKEN_URL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id: clientID,
					client_secret: clientSecret,
					code,
					state,
				}),
			})
			const data = (await response.json()) as {
				access_token?: string
				error?: string
				error_description?: string
			}

			if (!response.ok || !data.access_token) {
				renderPopupResponse(res, 'error', {
					message: data.error_description ?? data.error ?? 'GitHub token exchange failed.',
				})
				return
			}

			renderPopupResponse(res, 'success', { token: data.access_token, provider: PROVIDER })
			return
		} catch {
			renderPopupResponse(res, 'error', { message: 'GitHub token exchange failed.' })
			return
		}
	}

	const provider = Array.isArray(req.query.provider) ? req.query.provider[0] : req.query.provider
	const scopeQuery = Array.isArray(req.query.scope) ? req.query.scope[0] : req.query.scope
	const scope = scopeQuery || 'repo'

	if (provider && provider !== PROVIDER) {
		renderPopupResponse(res, 'error', { message: `Unsupported provider: ${provider}` })
		return
	}

	if (!clientID) {
		renderPopupResponse(res, 'error', {
			message: 'Missing OAUTH_CLIENT_ID (or GITHUB_CLIENT_ID).',
		})
		return
	}

	const state = randomBytes(24).toString('hex')
	setStateCookie(res, state, secure)

	const authorizeURL = new URL(GITHUB_AUTHORIZE_URL)
	authorizeURL.searchParams.set('client_id', clientID)
	authorizeURL.searchParams.set('redirect_uri', `${baseURL}/api/auth`)
	authorizeURL.searchParams.set('scope', scope)
	authorizeURL.searchParams.set('state', state)

	res.redirect(authorizeURL.toString())
}
