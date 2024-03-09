import type { Handle } from '@sveltejs/kit'
import { getInsignia } from '$lib/insignia'

export const handle: Handle = async ({ event, resolve }) => {
	const insignia = event.cookies.get('insignia')
	if (!insignia) {
		console.log('setting insignia: ' + insignia)
		event.cookies.set('insignia', getInsignia(), { path: '/' })
	}

	console.log({ insignia })

	const response = await resolve(event)
	return response
}
