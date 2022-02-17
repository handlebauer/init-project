export const packageJsonSnippet = (lerna, version) => ({
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
    "version": ${version},
    "type": "module",
  }
`
    : `
  {
    "name": "{{name}}",
    "version": ${version},
    "type": "module",
    "author": "Donald Geddes",
    "repository": "https://github.com/{{user:"handlebauer"}}/{{repo:name}}.git",
  }
`,
})
