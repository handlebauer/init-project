export const packageJsonSnippet = lerna => ({
  name: 'package',
  message: 'package.json',
  required: true,
  fields: [
    {
      name: 'name',
      message: 'Package Name',
    },
  ],
  template: lerna
    ? `
  {
    "name": "{{name}}",
    "version": "0.0.0",
    "type": "module",
  }
`
    : `
  {
    "name": "{{name}}",
    "version": "0.0.0",
    "type": "module",
    "author": "Donald Geddes",
    "repository": "https://github.com/{{user:"handlebauer"}}/{{repo:name}}.git",
  }
`,
})
