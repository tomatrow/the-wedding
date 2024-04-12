import { AIRTABLE_TYPEGEN_ACCESS_TOKEN, AIRTABLE_TYPEGEN_WORKSPACE_ID } from '$env/static/private'
import { pick } from 'lodash-es'
import Airtable, { type Table } from 'airtable'
import type { People, Campsites, Volunteers, GrantedWishes, Wishes } from './schema/wedding'

Airtable.configure({ apiKey: AIRTABLE_TYPEGEN_ACCESS_TOKEN })

const airtable = new Airtable()

const base = airtable.base(AIRTABLE_TYPEGEN_WORKSPACE_ID)

type AirtableFormData<T extends { Name?: string; 'Submit Time'?: Date }> = Omit<T, 'Submit Time'> & {
	'Submit Time'?: string
	Name?: string
}

type AirtablePeople = AirtableFormData<People>
type AirtableCampsites = AirtableFormData<Campsites>
type AirtableVolunteers = AirtableFormData<Volunteers>

export class FormTable<T extends { Name?: string; 'Submit Time'?: Date }> {
	table: Table<AirtableFormData<T>>

	constructor(tableName: string) {
		this.table = base.table(tableName)
	}

	create(value: T) {
		return this.table.create([
			{
				fields: {
					...value,
					'Submit Time': value['Submit Time']?.toISOString()
				}
			}
		])
	}

	getAll() {
		return this.table
			.select({
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
}

export const grantedWishesFormTable = new FormTable<GrantedWishes>('Granted Wishes')

const wishesTable = base.table<Wishes>('Wishes')
const peopleTable = base.table<AirtablePeople>('People')
const campsitesTable = base.table<AirtableCampsites>('Campsites')
const volunteersTable = base.table<AirtableVolunteers>('Volunteers')

export function getWishes() {
	return wishesTable
		.select({
			view: 'Grid view'
		})
		.all()
}

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

export async function getLentilCount() {
	const people = await peopleTable.
		select({
			filterByFormula: `{Main Dish} = "Vegan Lentil Soup"`,
		})
		.all()
	
	return people.length
}
