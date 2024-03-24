import { AIRTABLE_TYPEGEN_ACCESS_TOKEN, AIRTABLE_TYPEGEN_WORKSPACE_ID } from '$env/static/private'
import { pick } from 'lodash-es'
import Airtable from 'airtable'
import type { People, Campsites, Volunteers } from './schema/wedding'

Airtable.configure({ apiKey: AIRTABLE_TYPEGEN_ACCESS_TOKEN })

const airtable = new Airtable()

const base = airtable.base(AIRTABLE_TYPEGEN_WORKSPACE_ID)

type AirtablePeople = Omit<People, 'Submit Time'> & {
	'Submit Time': string
}

type AirtableCampsites = Omit<Campsites, 'Submit Time'> & {
	'Submit Time': string
}

type AirtableVolunteers = Omit<Volunteers, 'Submit Time'> & {
	'Submit Time': string
}

const peopleTable = base.table<AirtablePeople>('People')
const campsitesTable = base.table<AirtableCampsites>('Campsites')
const volunteersTable = base.table<AirtableVolunteers>('Volunteers')

export function createVolunteer({ 'Submit Time': submitTime, ...rest }: Volunteers) {
	return volunteersTable.create([
		{
			fields: {
				...rest,
				'Submit Time': submitTime?.toISOString()
			}
		}
	])
}

export async function getVolunteers(insignia: string) {
	return await volunteersTable
		.select({
			filterByFormula: `Identifier = "${insignia}"`,
			sort: [
				{
					field: 'Submit Time'
				},
				{
					field: 'Name'
				}
			]
		})
		.all()
}

export function createCampsite({ 'Submit Time': submitTime, ...rest }: Campsites) {
	return campsitesTable.create([
		{
			fields: {
				...rest,
				'Submit Time': submitTime?.toISOString()
			}
		}
	])
}

export async function getCampsites(insignia: string) {
	return await campsitesTable
		.select({
			filterByFormula: `Identifier = "${insignia}"`,
			sort: [
				{
					field: 'Submit Time'
				},
				{
					field: 'Name'
				}
			]
		})
		.all()
}

export function createPeople(people: People[]) {
	return peopleTable.create(
		people.map((person) => ({
			fields: {
				...pick(person, 'Name', 'Main Dish', 'Bread', 'Attendance', 'Identifier'),
				'Submit Time': person['Submit Time']?.toISOString()
			}
		}))
	)
}

export async function getPeople(insignia: string) {
	return await peopleTable
		.select({
			filterByFormula: `Identifier = "${insignia}"`,
			sort: [
				{
					field: 'Submit Time'
				},
				{
					field: 'Name'
				}
			]
		})
		.all()
}
