# Design Spec: Loading Screen Optima Medium Font

## Goal
Update the full-screen splash loader ("ZIPPY" text) in `LoadingScreen.tsx` to use the `Optima Medium` font (`Optima Medium.ttf`) with bold weight on both mobile and desktop screen sizes.

## Project Context
The font file `Optima Medium.ttf` is located at `public/assets/fonts/Optima Medium.ttf`. Next.js font management uses `localFont` from `next/font/local` in `src/app/layout.tsx`.

## Proposed Changes

### 1. `src/app/layout.tsx`
- Import `localFont` configuration for `Optima Medium`:
  ```tsx
  const optimaMedium = localFont({
    src: "../../public/assets/fonts/Optima Medium.ttf",
    variable: "--font-optima-medium",
  });
  ```
- Pass `${optimaMedium.variable}` into the `<html>` root class string alongside existing font variables.

### 2. `src/app/globals.css`
- Add `--font-optima-medium: var(--font-optima-medium), ui-sans-serif, system-ui, sans-serif;` inside the `@theme inline` block.

### 3. `src/components/ui/LoadingScreen.tsx`
- Change font family and weight on the `{WORD}` text container:
  - From: `font-[family-name:var(--font-ultra)] font-black`
  - To: `font-[family-name:var(--font-optima-medium)] font-bold`

## Verification Plan
- Run dev build or typecheck (`pnpm build` or `npx tsc --noEmit`) to verify zero TypeScript errors.
- Visually verify that the loader renders "ZIPPY" in Optima Medium bold font on mobile and desktop viewports.
