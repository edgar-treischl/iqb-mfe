# Copilot instructions for this repository

## Build, lint, and local run commands

- Use `yarn`, not `npm`. The repo checks in `yarn.lock`, and the GitHub Actions workflow installs and caches Yarn dependencies.
- `yarn dev` starts the Vite dev server on port `5174`.
- `yarn build` runs TypeScript compilation (`tsc -b`) then creates the production bundle in `dist/`.
- `yarn lint` runs ESLint across the repo.
- `yarn preview` serves the built remote with `vite preview` on port `5174`.
- There is no test runner or `test` script configured yet.

## High-level architecture

- This is a React + Vite micro-frontend remote showing IQB-Bildungstrend 2022 data for German language competencies.
- `vite.config.ts` uses `@originjs/vite-plugin-federation` to expose `./App` from `./src/App.tsx`, producing `remoteEntry.js` for a host shell to consume.
- `src/App.tsx` is the actual remote surface. `src/main.tsx` only bootstraps that same component into `#root` for standalone local development.
- `react` and `react-dom` are configured as shared singletons in the federation config. Preserve that unless the host integration changes deliberately.
- The Vite `base` is set to `/iqb-mfe/` because the deploy workflow publishes the built `dist/` directory to GitHub Pages. Do not change the base path casually; it is tied to deployment.
- Both `server.port` and `preview.port` are pinned to `5174`, so local development and preview match the expected remote port.

## Data architecture

- `src/iqb.ts` contains all data types, constants, filtering logic, and data transformation functions. This is the single source of truth for IQB data operations.
- Raw data is stored in `src/data/iqb.json` and generated from `R/iqb_deutsch.R` using `R/export_data.R`.
- The IQB data shows competency level distributions (Stufen Ia through V) across three domains (Lesen, Orthografie, Zuhören) for Bavaria and Germany.
- Data can be filtered by Bundesland (Bayern/Deutschland), Bereich (subject area), and Teilpopulation (school type/qualification level).

## Key conventions

- Design for constrained host layout. The remote should fill the container it is mounted into, degrade cleanly in smaller spaces, and avoid page-level spacing assumptions that fight the host shell.
- Keep styles isolated from the host. Avoid CSS leakage into the shell and avoid assumptions beyond a shared baseline.
- Changes to `src/App.tsx` affect both standalone local rendering and the federated export, so treat it as the shared entrypoint for both modes.
- TypeScript uses bundler-mode resolution (`moduleResolution: "bundler"`) with `allowImportingTsExtensions: true` and `verbatimModuleSyntax: true`. Import TypeScript files with their extensions (e.g., `./App.tsx`, `./components/OverviewView.tsx`).
- The app uses a data-driven approach. The `src/iqb.ts` module handles all data normalization, filtering, and calculations. Components receive prepared data rather than performing raw data manipulation.
- Type definitions are co-located with data logic. Domain types like `IQBDatum`, `Bereich`, `Teilpop`, `Stufe` live in `iqb.ts` rather than in separate type files.
- Components follow a controlled component pattern. Parent state flows down via props, changes flow up via callbacks.
- Chart color scheme follows the IQB design: dark teal to brown gradient (`#01665e` to `#8c510a`) matching the R/ggplot2 specification.
- Percentage labels under 5% are hidden in charts (following IQB convention).
- German language is used throughout the UI (labels, descriptions, error messages).
