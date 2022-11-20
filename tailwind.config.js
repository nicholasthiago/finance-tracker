/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./index.html"
	],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
        preflight: false,
    },
}
