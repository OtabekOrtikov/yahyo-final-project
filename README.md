
# 🛒 Shopping List App (TypeScript + Vite)

A lightweight, framework-free shopping-list SPA built with **TypeScript** and **Vite**, featuring:

- Add / remove / check / uncheck items  
- Optional categories + live category filter  
- Persistent storage via `localStorage`  
- Strict TypeScript (no `any`) + error handling  
- Jest unit tests with ≥ 80 % coverage  
- Zero-warning ESLint (`@typescript-eslint/recommended`)

---

## 🔧 Requirements

| Tool                       | Version         |
| -------------------------- | --------------- |
| **Node.js**                | v18.18.0 (LTS)  |
| **npm**                    | v9.x            |
| **Vite**                   | ^6.x            |
| **TypeScript**             | ^5.x            |
| **Jest** (+ `ts-jest`)     | ^29.x           |
| **ESLint**                 | ^8.x            |
| **@typescript-eslint**     | ^6.x            |

---

## 📂 Project Structure

```plain
.
├── index.html           # HTML entry-point
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript compiler options
├── .eslintrc.cjs        # ESLint config
├── package.json         # scripts & dependencies
├── src/
│   ├── index.ts         # app bootstrap & DOM wiring
│   ├── Item.ts          # Item class (domain model)
│   ├── ShoppingList.ts  # shopping-list storage & logic
│   ├── style.css        # basic styles
│   └── __tests__/       # Jest tests
│       ├── Item.test.ts
│       └── ShoppingList.test.ts
└── coverage/            # auto-generated test coverage report
````

---

## 🚀 Setup & Run Locally

1. **Clone** the repo

   ```bash
   git clone https://github.com/<your-username>/shopping-list-app.git
   cd shopping-list-app
   ```

2. **Install** dependencies

   ```bash
   npm install
   ```

3. **Start dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

   * `npm run build` → outputs `/dist`
   * `npm run preview` → serves `/dist` at [http://localhost:4173](http://localhost:4173)

---

## ✅ Testing & Coverage

```bash
npm run test
```

* Runs Jest via `ts-jest`
* Generates coverage report in `coverage/lcov-report/index.html`
* Coverage enforced ≥ 80 % lines

---

## 🧹 Linting

```bash
npm run lint
```

* Uses ESLint + `@typescript-eslint/recommended`
* `--max-warnings 0` ensures zero warnings

---

## ✏️ Contributing

1. Fork & clone
2. Create feature branch
3. `npm install` → `npm run lint && npm test` → commit
4. Open a PR