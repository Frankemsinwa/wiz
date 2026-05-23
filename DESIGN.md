# Design System: Wise Prototype

> Category: Fintech / Banking
> Focus: International transfers and multi-currency accounts.
> Atmosphere: Bold, confident, nature-inspired, and urgent.

## 1. Visual Theme & Atmosphere

This prototype follows the **Wise** design identity—a "money without borders" aesthetic that prioritizes clarity through extreme contrast and massive typography. The core experience is built on a warm off-white canvas with near-black text and the signature **Wise Green** accent.

**Key Visual Pillars:**
- **Billboard Typography**: Display headings use extreme weights (900/Black) with ultra-tight line heights.
- **Physical Interaction**: Buttons and interactive elements physically grow (`scale(1.05)`) on hover, creating a tactile "alive" feel.
- **Borderless Materiality**: Minimal shadows; depth is created through high-contrast color blocks and ring shadows.
- **Confident Tone**: Semibold (600) is the default weight for body text, communicating reliability.

## 2. Color Palette

```css
:root {
  /* Brand */
  --color-wise-green: #9fe870; /* Primary Accent */
  --color-dark-green: #163300; /* Text on Green */
  --color-near-black: #0e0f0c; /* Primary Text & Dark Sections */
  
  /* Backgrounds */
  --bg-page:    #fafaf7; /* Warm Off-white Canvas */
  --bg-surface: #ffffff; /* Card/Elevated Surface */
  --bg-mint:    #e2f6d5; /* Soft Badge Background */
  
  /* Functional */
  --color-positive: #054d28;
  --color-negative: #d03238;
  --color-warning:  #ffd11a;
  --color-border:   rgba(14, 15, 12, 0.12);
  --color-muted:    #6b6964;
}
```

## 3. Typography Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| **Display Mega** | 96px | 900 | 0.85 | -0.02em |
| **Section Title** | 48px | 900 | 0.85 | -0.02em |
| **Card Title** | 22px | 600 | 1.25 | -0.01em |
| **Body (Default)** | 18px | 600 | 1.44 | normal |
| **Caption** | 14px | 400 | 1.50 | normal |

- **Font Family**: Primary: `Inter`, Fallback: `-apple-system, sans-serif`.
- **Feature**: `font-variant-numeric: tabular-nums` for all currency values.

## 4. Components & Posture

### Buttons (The "Wise Pill")
- **Primary**: Background `--color-wise-green`, Text `--color-dark-green`.
- **Radius**: `9999px`.
- **Animation**: 
  - Hover: `transform: scale(1.05);`
  - Active: `transform: scale(0.95);`
  - Transition: `200ms cubic-bezier(0.2, 0, 0, 1)`.

### Cards
- **Radius**: `24px` to `40px`.
- **Border**: `1px solid var(--color-border)`.
- **Shadow**: `0 0 0 1px var(--color-border)` (Ring Shadow).

### Forms & Inputs
- **Radius**: `12px`.
- **Background**: `transparent` with a subtle bottom border or soft surface fill.
- **Focus**: `0 0 0 2px var(--color-wise-green)` inset ring.

## 5. Interaction Principles

- **Rhythm**: No more than 3 screens of the same theme in a row.
- **Spacing**: Base unit of `8px`. Use `24px`, `48px`, and `64px` for major section padding.
- **Micro-copy**: Direct, active voice. "Send money" instead of "Initiate Transfer Request."
