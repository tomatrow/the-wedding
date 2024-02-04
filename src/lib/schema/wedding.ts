import { z } from 'zod';

export const PeopleAttendance = z.enum(['Attending', 'Declined']);

export const PeopleSchema = z.object({
	Name: z.string().optional(),
	Attendance: PeopleAttendance.optional()
});
export type People = z.infer<typeof PeopleSchema>;
