---
name: Aurelian Light
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Newsreader
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  mono-label:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The brand personality is an intersection of high-end editorial prestige and technical precision. It is designed for an audience that values clarity, intellectual rigor, and premium aesthetics—reminiscent of a high-end technical journal or a boutique architectural monograph. 

The design style is **Minimalist** with a focus on structural integrity. It utilizes expansive whitespace not merely as a void, but as a deliberate framing tool to direct attention. The emotional response should be one of calm authority and effortless sophistication. Every element exists for a reason; there is no decoration, only function elevated to an art form.

## Colors
The palette is rooted in a "Bone and Obsidian" foundation. The primary surface is a crisp, warm off-white (#FAFAFA) that reduces the eye strain of pure white while maintaining a premium, paper-like feel. 

Typography and core UI accents utilize Deep Obsidian (#121212) for maximum legibility and a striking, authoritative presence. The accent strategy uses a refined Gold/Amber scale (#C5A059 to #FFBF00) exclusively for high-priority calls to action and critical status indicators, ensuring they vibrate against the monochrome base without breaking the minimalist harmony.

## Typography
The typographic system creates a tension between technical modernism and classical editorial traditions. 

- **Headlines:** Uses **Hanken Grotesk** for a sharp, contemporary, and engineered feel. It should be set with tight tracking in display sizes to emphasize its geometric precision.
- **Body:** Uses **Newsreader**. This serif choice provides the "technical journal" feel, offering high readability for long-form content and a sophisticated contrast to the sans-serif headings.
- **Labels & Data:** Uses **Geist**. Its monospaced influences provide a developer-centric clarity for micro-copy, status labels, and metadata.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain the integrity of a printed journal, transitioning to a fluid model for mobile devices. 

A 12-column grid is used for desktop (1200px max width) with generous 48px outer margins. Spacing is strictly mathematical, based on a 4px baseline, but defaults to larger increments (MD/LG) to ensure the UI feels uncrowded. 1px dividers in `#E5E5E5` are used to define zones without adding visual weight. On mobile, margins shrink to 16px, and complex multi-column layouts reflow into a single-column vertical stack to preserve legibility.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layers** and **Thin Outlines** rather than traditional shadows. 

The primary canvas is `#FAFAFA`. Elevated elements (like cards or floating panels) use a pure white background (#FFFFFF) and are defined by a subtle 1px border in `#E5E5E5`. To simulate the "Aurelian" depth, a very soft, high-diffusion shadow may be used only for top-level modals (e.g., Blur: 20px, Opacity: 4%, Color: #121212). Elements should feel like they are resting on the page, not hovering far above it.

## Shapes
The shape language is strictly **Sharp (0px)**. 

To reinforce the technical and architectural narrative, all buttons, input fields, cards, and containers utilize right angles. This lack of rounding emphasizes the precision of the grid and the "obsidian" accents. The only exception to the linear rule is the use of circular iconography or data visualizations, which then act as organic focal points within the rigid structure.

## Components
- **Buttons:** Primary buttons are solid Obsidian (#121212) with White text. Secondary buttons use a 1px Obsidian border with no fill. High-contrast "Aurelian" actions use a solid Gold (#C5A059) fill. All buttons are rectangular with no corner radius.
- **Input Fields:** Minimalist underlines or 1px borders in `#E5E5E5`. Labels use the `label-sm` (Geist) style, positioned strictly above the input.
- **Chips/Tags:** Small rectangular blocks with a light grey (#F0F0F0) background and `mono-label` Geist typography.
- **Cards:** Defined by 1px dividers or subtle background shifts to white. No shadows. Content is padded generously (MD spacing).
- **Checkboxes/Radios:** Sharp-edged squares and diamonds. When active, they are filled with Obsidian (#121212) rather than primary colors to maintain the monochrome aesthetic.
- **Dividers:** 1px solid lines using `#E5E5E5`. Use these horizontally to separate content sections and vertically to separate sidebar navigation from main content.