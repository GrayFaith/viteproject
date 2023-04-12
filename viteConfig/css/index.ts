import cssNano from 'cssnano';
export function setupPostcss() {
	return {
		plugins : [
			cssNano({
				parallel : true,
				preset   : [
					'advanced', {
						discardComments : {
							removeAll : true
						}
					}
				]
			})
		]
	};
}