import { z } from 'zod'

export const PeopleAttendance = z.enum([
  'Attending',
  'Declined',
])

export const PeopleMeal = z.enum([
  'Beef Stew',
  'Lentil Soup',
])

export const PeopleSchema = z.object({
  'Name': z.string().optional(),
  'Attendance': PeopleAttendance.optional(),
  'Meal': PeopleMeal.optional(),
  'Signup Time': z.coerce.date().optional(),
})
export type People = z.infer<typeof PeopleSchema>
