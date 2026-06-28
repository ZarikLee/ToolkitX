---
name: Aurelian Minimalist
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#c5c7c8'
  on-tertiary: '#2e3132'
  tertiary-container: '#101314'
  on-tertiary-container: '#7c7e7f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is anchored in a high-end minimalist professional aesthetic, tailored for executive-grade digital experiences. It targets a sophisticated audience that values clarity, precision, and understated luxury. The emotional response is one of calm authority and effortless efficiency.

The design style is **Minimalist with Tonal Depth**, focusing on:
- **Generous Whitespace:** Content is given significant room to breathe, emphasizing importance through isolation.
- **Rigid Structure:** A strict adherence to grid systems ensures a sense of stability and reliability.
- **Premium Textures:** Subtle noise grains and soft gradients replace flat fills to evoke a sense of physical, high-quality materials.
- **Refined Contrast:** Eschewing pure blacks for deep charcoals to maintain a softer, more legible professional tone.

## Colors

The palette is optimized for a high-contrast dark mode that feels expensive rather than "gamer-centric."

- **Primary (Deep Charcoal - #121212):** Used for the main canvas. It provides a grounded, stable base that reduces eye strain.
- **Secondary (Muted Gold - #D4AF37):** Reserved exclusively for high-impact actions, active states, and brand signatures. It should be used sparingly to maintain its "premium" effect.
- **Tertiary (Soft White - #F8F9FA):** Used for primary headings and high-priority body text. It is slightly warmed to prevent the harsh vibration often found in pure white-on-black text.
- **Neutral (Surface - #2A2A2A):** Used for secondary containers, cards, and input backgrounds to create depth against the primary background.

## Typography

Typography in the design system follows a strict hierarchy to enforce readability and professional tone. **Inter** is the workhorse, providing a clean, neo-grotesque foundation that performs exceptionally well at all scales.

- **Display & Headlines:** Utilize tighter letter spacing and medium weights to create a "block" feel that anchors sections.
- **Body Text:** Set with generous line height (1.6) to ensure long-form content is digestible.
- **Labels:** We introduce **Geist** for technical labels and small metadata. Its monospaced-adjacent tracking adds a "engineered" precision to the UI.
- **Case Usage:** Labels should use uppercase with slight tracking to differentiate from body prose.

## Layout & Spacing

The layout is built on a **12-column fixed grid** for desktop, transitioning to a fluid model for mobile devices. 

- **The 8px Rhythm:** All padding, margins, and component heights must be multiples of 8px. 
- **Desktop:** 12 columns, 24px gutters, with a maximum container width of 1280px. Large 64px outer margins reinforce the "minimalist gallery" aesthetic.
- **Tablet:** 8 columns, 24px gutters, 40px outer margins.
- **Mobile:** 4 columns, 16px gutters, 20px outer margins. Content should primarily stack vertically, using full-width components to maintain a clean edge.

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layering** and **Micro-Shadows**. 

- **Surface Levels:** 
  - Level 0: Background (#121212)
  - Level 1: Cards/Modals (#1C1C1C)
  - Level 2: Popovers/Tooltips (#2A2A2A)
- **Shadows:** When necessary, use a "Sharp-Soft" shadow technique: a very tight 2px shadow with 40% opacity followed by a 12px blur with 10% opacity, both tinted with the primary charcoal color to prevent a "dirty" look.
- **Borders:** Use 1px solid borders in #2A2A2A for structural separation. Avoid borders on cards unless they overlap high-contrast areas.

## Shapes

The shape language is "Architectural." We use **Soft (0.25rem)** roundedness to take the edge off the rigid grid without veering into the friendly/playful territory of more rounded systems.

- **Standard Elements:** Buttons and Input fields use a 4px (0.25rem) radius.
- **Large Containers:** Cards and Modals use an 8px (0.5rem) radius.
- **Interactive States:** On hover, shapes do not change radius, but may receive a subtle inner-border light catch to simulate a beveled edge.

## Components

- **Buttons:** Primary buttons are Solid Muted Gold with Charcoal text. Secondary buttons are Ghost-style with a Soft White border and text. No gradients.
- **Input Fields:** Filled style using the Neutral Surface color (#1C1C1C) with a bottom-only 2px border that turns Gold on focus. Labels sit above the field in Geist-Caps.
- **Chips/Tags:** Small, rectangular, with no radius. Use a #2A2A2A background with Soft White text for a "label maker" aesthetic.
- **Cards:** No external shadows. Use a 1px border (#2A2A2A) and a subtle background shift. Content should be padded by at least 32px.
- **Lists:** Clean horizontal separators (1px, #1C1C1C). Use generous vertical padding (16px+) between list items.
- **Selection Controls:** Checkboxes and Radio buttons are sharp-edged. Active states use the Muted Gold accent color for the inner mark.