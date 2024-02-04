import { set } from 'lodash-es';

export function isNotNil<T>(value: T | undefined | null): value is T {
	return value !== null && value !== undefined;
}

export function isURL(value: string) {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

type StructuredFormDataValue = FormDataEntryValue | { [key: string]: StructuredFormDataValue };
export type StructuredFormData = Record<string, StructuredFormDataValue>;

export function getStructuredFormData(formData: FormData) {
	const data: StructuredFormData = {};
	formData.forEach((value, path) => set(data, path, value));
	return data;
}
