# Fullstack solid setup

# Project setup

```bash
npx lerna init
mkdir packages
npm create vite@latest frontend
npm install cypress --save-dev // and remove "type":"module" in package.json
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p --full

```

# Development setup

```bash
nm install
lerna run dev -w frontend
```
