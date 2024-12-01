import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [...compat.extends('eslint:recommended'), {
	plugins: {},

	languageOptions: {
		globals: { ...globals.node },

		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	rules: {
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error', 'never'],
		'array-element-newline': ['error', 'consistent'],
		'arrow-body-style': ['error', 'as-needed'],
		'arrow-parens': ['error', 'as-needed'],
		'block-spacing': ['error', 'always'],
		'brace-style': ['error', '1tbs'],

		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			exports: 'always-multiline',
			functions: 'always-multiline',
			imports: 'always-multiline',
			objects: 'always-multiline',
		}],

		'comma-spacing': ['error', {
			after: true,
			before: false,
		}],

		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		curly: ['error', 'multi-line', 'consistent'],
		'default-case-last': ['error'],
		'dot-location': ['error', 'property'],
		'dot-notation': ['error'],
		eqeqeq: ['error'],
		'func-call-spacing': ['error', 'never'],
		indent: ['error', 'tab'],
		'linebreak-style': ['off', 'windows'],

		'max-depth': ['warn', { max: 6 }],

		'max-len': ['warn', {
			code: 180,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreTrailingComments: true,
			ignoreUrls: true,
		}],

		'max-lines': ['warn'],
		'max-statements-per-line': ['error'],
		'multiline-comment-style': ['off'],
		'no-console': ['off'],
		'no-prototype-builtins': ['off'],
		'no-return-assign': ['error'],
		'no-template-curly-in-string': ['warn'],
		'no-trailing-spaces': ['error'],

		'no-underscore-dangle': ['warn', {
			allowAfterThis: true,
			allowFunctionParams: true,
		}],

		'no-unneeded-ternary': ['error'],
		'no-unused-expressions': ['error'],
		'no-var': ['error'],
		'no-whitespace-before-property': ['error'],

		'object-curly-newline': ['error', {
			minProperties: 4,
			multiline: true,
		}],

		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error'],
		'operator-linebreak': ['error'],
		'prefer-arrow-callback': ['error'],

		'prefer-const': ['error', {
			destructuring: 'all',
			ignoreReadBeforeAssign: false,
		}],

		quotes: ['error', 'single'],
		'rest-spread-spacing': ['error', 'never'],
		semi: ['error', 'always'],

		'sort-keys': ['off', 'asc', { natural: true }],

		'space-in-parens': ['error', 'never'],
		'spaced-comment': ['error', 'always'],
	},
}];