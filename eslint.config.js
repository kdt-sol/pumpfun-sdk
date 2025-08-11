export default import('@kdt310722/eslint-config').then((m) => m.defineFlatConfig({}, { ignores: ['**/generated', 'src/test.ts'] }, {
    rules: {
        'sonarjs/no-selector-parameter': 'off',
    },
}))
