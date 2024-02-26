import { z } from 'zod'

export const PeopleAttendance = z.enum(['Attending', 'Declined'])

export const PeopleMainDish = z.enum(['Beef Stew', 'Vegan Lentil Soup'])

export const PeopleBread = z.enum(['Gluten Free', 'Gluten Full'])

export const PeopleSchema = z.object({
	Name: z.string().optional(),
	Attendance: PeopleAttendance.optional(),
	'Main Dish': PeopleMainDish.optional(),
	Bread: PeopleBread.optional(),
	'Submit Time': z.coerce.date().optional(),
	Wishes: z.string().optional(),
	'Granted Wishes': z.array(z.string()).optional(),
	'Seed Round': z.array(z.string()).optional()
})
export type People = z.infer<typeof PeopleSchema>

export const WishesSchema = z.object({
	Title: z.string().optional(),
	Link: z.string().optional(),
	Notes: z.string().optional(),
	Quantity: z.number().int().positive().optional(),
	'Granted Wishes': z.array(z.string()).optional()
})
export type Wishes = z.infer<typeof WishesSchema>

export const GrantedWishesSchema = z.object({
	Date: z.coerce.date().optional(),
	Wish: z.array(z.string()).optional(),
	Granters: z.array(z.string()).optional(),
	Quantity: z.number().int().positive().optional()
})
export type GrantedWishes = z.infer<typeof GrantedWishesSchema>

export const SeedRoundFund = z.enum(['Honeymoon', 'Furniture'])

export const SeedRoundSchema = z.object({
	Date: z.coerce.date().optional(),
	Fund: z.array(SeedRoundFund).optional(),
	Gift: z.number().positive().optional(),
	Gifters: z.array(z.string()).optional()
})
export type SeedRound = z.infer<typeof SeedRoundSchema>
