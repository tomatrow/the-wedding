import { AIRTABLE_TYPEGEN_ACCESS_TOKEN, AIRTABLE_TYPEGEN_WORKSPACE_ID } from "$env/static/private"
import Airtable from "airtable"
import type { People } from "./schema/wedding"

Airtable.configure({ apiKey: AIRTABLE_TYPEGEN_ACCESS_TOKEN })

const airtable = new Airtable()

const base = airtable.base(AIRTABLE_TYPEGEN_WORKSPACE_ID)


type AirtablePeople = Omit<People, 'Submit Time'> & {
	'Submit Time': string
}

const peopleTable = base.table<AirtablePeople>("People")

export function createPeople(people: People[]) {
	return peopleTable.create(people.map(person => {
		
		return {
			fields: {
				Name: person.Name,
				"Main Dish": person["Main Dish"],
				Bread: person.Bread,
				"Submit Time": person["Submit Time"]?.toISOString(),
				Attendance: person.Attendance
			}
		}
	}))

}