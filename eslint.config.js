export default import('@kdt310722/eslint-config').then((m) => m.defineFlatConfig({}, { ignores: ['**/generated'] }, {
    rules: {
        'sonarjs/no-selector-parameter': 'off',
    },
}))
