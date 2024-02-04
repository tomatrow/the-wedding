const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#111827',
				secondary: '#581c87',
				accent: '#dc8850',
				neutral: '#2e282a',
				'base-100': '#854d0e',
				info: '#047857',
				success: '#14532d',
				warning: '#d97706',
				error: '#7f1d1d'
			},
			fontFamily: {
				catherine: ['Catherine', 'sans-serif']
			}
		}
	},

	plugins: [forms, typography, daisyui]
};

module.exports = config;
