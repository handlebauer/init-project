export const defaultJsConfig = {
  compilerOptions: {
    checkJs: true,
    noImplicitAny: true,
    noImplicitThis: true,
    target: 'esnext',
    declaration: true,
    emitDeclarationOnly: true,
    outDir: 'types',
    noEmit: false,
    moduleResolution: 'node',
  },
  include: ['src/index.js'],
  exclude: ['node_modules'],
}
