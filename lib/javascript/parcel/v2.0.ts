export function generate(params: any): string {
	return JSON.stringify(
		{
			extends: "@parcel/config-default",
			transformers: {
				"*.{js,jsx,ts,tsx}": ["@parcel/transformer-babel", "@parcel/transformer-js"],
				"*.css": ["@parcel/transformer-postcss"],
				"*.{png,jpg,jpeg,gif,svg,webp}": ["@parcel/transformer-image"],
			},
			namers: ["@parcel/namer-default"],
			optimizers: {
				"*.js": ["@parcel/optimizer-terser"],
				"*.css": ["@parcel/optimizer-cssnano"],
			},
			reporters: ["@parcel/reporter-cli"],
		},
		null,
		2,
	);
}
