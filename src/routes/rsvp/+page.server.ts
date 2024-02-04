import type { Actions, PageServerLoad } from './$types';
import { PeopleSchema } from '$lib/schema/wedding';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({}) => {
	const form = await superValidate(zod(PeopleSchema));
	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(PeopleSchema));
		if (!form.valid) return fail(400, { form });

		return { form };
	}
} satisfies Actions;
