import type { People } from '$lib/schema/wedding'

export type MainDishType = People['Main Dish'] & {}
export const MainDishTypes: Record<MainDishType, MainDishType> = {
	'Beef Stew': 'Beef Stew',
	'Vegan Lentil Soup': 'Vegan Lentil Soup'
}

export type BreadType = People['Bread'] & {}
export const BreadTypes: Record<BreadType, BreadType> = {
	'Gluten Free': 'Gluten Free',
	'Gluten Full': 'Gluten Full'
}

export type AttendenceType = People['Attendance'] & {}
export const AttendenceTypes: Record<AttendenceType, AttendenceType> = {
	Attending: 'Attending',
	Declined: 'Declined'
}
