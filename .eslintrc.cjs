// ESLint 检查配置
module.exports = {
	root          : true,
	env           : {
		browser : true,
		node    : true,
		es6     : true
	},
	extends       : [
		'./.eslintrc-auto-import.json',
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript'
		/*'@vue/eslint-config-prettier'*/
	],
	parserOptions : {
		ecmaVersion : 2021,
		parser      : '@typescript-eslint/parser'
	},
	rules         : {
		'prettier/prettier'             : 'off',
		'no-console'                    : 'production' === process.env.NODE_ENV ? 'warn' : 'off',
		'no-debugger'                   : 'production' === process.env.NODE_ENV ? 'warn' : 'off',
		'vue/no-multiple-template-root' : ['off'],
		// 将未使用的形式参数进行警告
		'no-case-declarations' : ['off'],
		'no-unused-vars'       : ['warn'],
		// 强制禁用拖尾逗号
		'comma-dangle' : ['warn', 'never'],
		// 强制使用分号结尾
		'semi' : ['warn', 'always'],
		// 强制使用单引号
		'quotes'          : [
			'warn', 'single',
			{
				avoidEscape           : false,
				allowTemplateLiterals : true
			}
		],
		'jsx-quotes'      : ['warn', 'prefer-single'],
		'vue/html-quotes' : ['warn', 'single'],
		// 强制禁用空格混合tab符号
		'no-mixed-spaces-and-tabs' : ['off'],
		// 强制使用统一的缩进
		'indent'          : [
			'warn', 'tab',
			{
				ObjectExpression : 1,
				SwitchCase       : 1 // 默认:0,指定switch-case语句的缩进级别
			}
		],
		'vue/html-indent' : ['off', 'tab'],
		// 最大属性换行
		'vue/max-attributes-per-line' : [
			'warn', {
				singleline : {
					max : 3
				},
				multiline  : {
					max : 3
				}
			}
		],
		// 禁用标签的开始丶标签的结尾,自结尾的标签换行
		'vue/html-closing-bracket-spacing' : [
			'warn', {
				startTag       : 'never',
				endTag         : 'never',
				selfClosingTag : 'never'
			}
		],
		// 禁用右侧的'>'之前强制换行
		'vue/html-closing-bracket-newline'   : [
			'warn', {
				singleline : 'never',
				multiline  : 'never'
			}
		],
		'vue/v-slot-style'                   : [
			'warn', {
				atComponent : 'longform',
				default     : 'v-slot',
				named       : 'longform'
			}
		],
		'vue/no-template-key'                : ['off'],
		'vue/valid-v-for'                    : ['off'],
		'vue/require-v-for-key'              : ['off'],
		'vue/no-v-for-template-key-on-child' : ['off'],
		'vue/no-v-for-template-key'          : ['off'],
		'vue/multi-word-component-names'     : ['off']
	}
};