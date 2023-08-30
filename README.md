# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Instalations

To start this app execute: 'npm install' in the correct directory

To start an app like this: 
   - npm create vite@latest > React > TS + SWC
   - cd app-name
   - npm install @mui/material @emotion/react @emotion/styled (to use material UI)
   - npm i @fontsource/roboto @mui/icons-material -E (to use roboto font and mui icons)
   - npm i
   - npm run dev to start the app

To use the linter:
   - npm i ts-standard -D
   - in the .eslintrc.cjs file add this line => parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
   - and in the tsconfig.json this line => "include": ["src", "./.eslintrc.cjs"],

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
