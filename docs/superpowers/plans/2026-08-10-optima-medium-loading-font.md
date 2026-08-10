# Optima Medium Loading Screen Font Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the loading screen "ZIPPY" text to use Optima Medium font in bold weight across mobile and desktop.

**Architecture:** Load `public/assets/fonts/Optima Medium.ttf` via Next.js `localFont` in `src/app/layout.tsx`, expose font variable `--font-optima-medium` in `src/app/globals.css`, and apply it to `src/components/ui/LoadingScreen.tsx`.

**Tech Stack:** Next.js 16 (App Router), `next/font/local`, Tailwind CSS v4, GSAP.

## Global Constraints
- Font file path: `public/assets/fonts/Optima Medium.ttf`
- CSS variable name: `--font-optima-medium`
- Text styling: Optima Medium, bold weight (`font-bold`) on mobile & desktop views

---

### Task 1: Register Optima Medium Font in Layout and Global Styles

**Files:**
- Modify: `src/app/layout.tsx:1-115`
- Modify: `src/app/globals.css:1-20`

**Interfaces:**
- Produces: CSS variable `--font-optima-medium` available globally on `<html>` root.

- [ ] **Step 1: Configure `localFont` in `src/app/layout.tsx`**

Add `optimaMedium` font definition in `src/app/layout.tsx`:
```tsx
const optimaMedium = localFont({
  src: "../../public/assets/fonts/Optima Medium.ttf",
  variable: "--font-optima-medium",
});
```
And add `${optimaMedium.variable}` to the `<html>` `className` list.

- [ ] **Step 2: Add CSS variable to `@theme inline` in `src/app/globals.css`**

Add `--font-optima-medium` to `src/app/globals.css`:
```css
  --font-optima-medium: var(--font-optima-medium), ui-sans-serif, system-ui, sans-serif;
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: register Optima Medium font in layout and globals CSS"
```

---

### Task 2: Apply Optima Medium Bold Font to Loading Screen "ZIPPY" Text

**Files:**
- Modify: `src/components/ui/LoadingScreen.tsx:220-234`

**Interfaces:**
- Consumes: `--font-optima-medium` CSS variable from `layout.tsx` and `globals.css`.

- [ ] **Step 1: Update `LoadingScreen.tsx` font class and weight**

In `src/components/ui/LoadingScreen.tsx`, update the `{WORD}` element `className`:
Replace:
```tsx
className="whitespace-nowrap opacity-0 font-[family-name:var(--font-ultra)] font-black uppercase leading-[0.8] tracking-normal text-[#DA7347] text-[clamp(6rem,27vw,26rem)]"
```
With:
```tsx
className="whitespace-nowrap opacity-0 font-[family-name:var(--font-optima-medium)] font-bold uppercase leading-[0.8] tracking-normal text-[#DA7347] text-[clamp(6rem,27vw,26rem)]"
```

- [ ] **Step 2: Verify type check and build**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit changes**

```bash
git add src/components/ui/LoadingScreen.tsx
git commit -m "feat: update loading screen ZIPPY text to use Optima Medium bold font"
```
