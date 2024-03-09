import { random } from 'lodash-es'
import adverbs from './adverbs.json'
import nouns from './nouns.json'
import verbs from './verbs.json'

function getRandomArrayValue<T>(array: T[]) {
	const index = random(0, array.length - 1)
	return array[index]
}

export function getInsignia() {
	return [adverbs, verbs, nouns].map(getRandomArrayValue).join('-')
}
