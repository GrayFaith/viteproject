export function setupTerser() {
	return {
		compress        : {
			defaults             : true,
			arguments            : true,
			booleans_as_integers : false,
			drop_console         : true,
			drop_debugger        : true,
			expression           : true,
			hoist_funs           : true,
			// 传递true以防止Infinity被压缩成1/0,这可能会导致Chrome上的性能问题
			keep_infinity : true,
			module        : true,
			toplevel      : true,
			unused        : true
		},
		ecma            : '2022',
		enclose         : false,
		ie8             : false,
		keep_classnames : true,
		keep_fnames     : true,
		mangle          : true,
		module          : true,
		nameCache       : null,
		format          : {
			comments     : false,
			indent_level : 4,
			indent_start : 0
		},
		parse           : {
			html5_comments : false
		},
		safari10        : false,
		sourceMap       : false,
		toplevel        : true,
		warnings        : false
	};
}