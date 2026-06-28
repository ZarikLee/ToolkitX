---
name: Neon Terminal
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#e5ffba'
  on-tertiary: '#223600'
  tertiary-container: '#a2ef00'
  on-tertiary-container: '#456900'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#a9f900'
  tertiary-fixed-dim: '#94db00'
  on-tertiary-fixed: '#121f00'
  on-tertiary-fixed-variant: '#334f00'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
  surface-glass: rgba(18, 18, 26, 0.75)
  border-glow: rgba(0, 240, 255, 0.3)
  terminal-black: '#050508'
  text-muted: '#888891'
  danger-neon: '#FF0055'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system is built for the modern developer—one who views coding as both a craft and an immersive experience. It draws heavily from **Cyberpunk Futurism** and **High-Tech IDE** aesthetics, blending the raw, technical feel of a terminal with the sophisticated polish of glassmorphism.

The emotional response is one of "focused flow." The dark environment reduces eye strain during long learning sessions, while neon accents act as logical beacons, guiding the user through complex information hierarchies. The style is professional yet edgy, positioning the platform as a high-end gateway to the future of software engineering.

**Core Principles:**
- **Technological Precision:** Every element feels engineered, not just decorated.
- **Luminous Hierarchy:** Use light and glow to indicate interactivity and "active" states.
- **Digital Depth:** Utilize layers of semi-transparent "glass" to manage high information density without clutter.

## Colors

The palette is anchored in a deep `terminal-black` to maximize contrast for neon elements. 

- **Primary (Electric Blue):** The main "active" color, used for primary actions, progress indicators, and core branding.
- **Secondary (Cyber Purple):** Used for advanced concepts, specific categories (e.g., AI/Data Science), and secondary highlights.
- **Tertiary (Acid Green):** Reserved for "success" states, code execution results, and "Latest Update" indicators.
- **Glassmorphism:** Surfaces use `surface-glass` with a 20px-40px backdrop blur to create a sense of physical layering. Borders should use a low-opacity version of the primary or secondary color to simulate a "light-leak" effect from the screen edges.

## Typography

The typography system balances the human-centric readability of **Inter** with the technical precision of **JetBrains Mono**.

- **Inter** is the workhorse for all prose, headings, and instructional content. It provides the "professional" foundation that ensures the knowledge base remains accessible.
- **JetBrains Mono** is used for all "meta-information," such as tags, code snippets, category labels, and UI controls. This reinforces the "Developer Tool" identity.
- **Case Styling:** Use `uppercase` with tracking for `label-mono` to evoke the feeling of a terminal status bar.
- **Contrast:** Maintain high contrast between headlines (Pure White) and body text (Gray-300) to ensure readability against dark backgrounds.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for the main content area to mimic the structured feel of a documentation portal or an IDE dashboard.

- **Desktop (1440px):** A 12-column grid with 24px gutters. Content is centered with wide margins to create focus.
- **Tablet (768px - 1024px):** 8-column grid with 20px gutters. Sidebars collapse into "Command Palette" style drawers.
- **Mobile (<768px):** 4-column grid with 16px margins. Cards stack vertically.
- **Density:** The design favors "Functional Density." While white space is used between major sections (`section-gap`), the internal components (like tutorial lists) are tightly packed to allow developers to scan vast amounts of data quickly—similar to a file explorer.

## Elevation & Depth

Hierarchy is established through **Luminous Layering** rather than traditional shadows.

- **Level 0 (Background):** Pure `terminal-black`.
- **Level 1 (Main Surfaces):** `surface-glass` with a 1px solid border at 10% opacity. This layer feels "sunken" or flush.
- **Level 2 (Interactive Cards):** Increased backdrop blur. On hover, the border opacity increases to 40% and gains a 15px outer glow (box-shadow) in the primary color.
- **Level 3 (Modals/Popovers):** Higher opacity background and a distinct 2px neon border. These elements should "float" with a subtle semi-transparent drop shadow to separate them from the content beneath.
- **Glow Effects:** Use `drop-shadow` on text labels sparingly to indicate status (e.g., a green glow for "Live Now").

## Shapes

The shape language is **Technical & Sharp**. 

We use a `Soft (0.25rem)` base roundedness to avoid the "toy-like" feel of fully rounded corners, maintaining a professional, engineered look. 

- **Buttons & Inputs:** `0.25rem` corner radius.
- **Tutorial Cards:** `0.5rem` (`rounded-lg`) for a slightly more defined container feel.
- **Status Pills:** `1rem` (Pill-shaped) to distinguish metadata from structural containers.
- **Borders:** Always sharp, 1px lines. No thick borders unless used for a specific "Brutalist" accent in a hero section.

## Components

- **Neon Buttons:** High-contrast background (Primary Color) with black text for the "Primary" state. "Secondary" buttons are transparent with a 1px neon border and neon text. Add a "scanline" CSS animation on hover for extra flair.
- **Glass Cards:** Used for tutorial items. Must include a `backdrop-filter: blur(20px)`. The top-left corner should feature a small `label-mono` tag indicating the category.
- **IDE-style Lists:** Navigation should mimic a file tree. Use chevron icons and "active" vertical bar indicators in the primary neon color.
- **Glowing Inputs:** Search bars and text fields should have a `0,0,0,0` shadow that expands into a neon glow when focused. Use JetBrains Mono for input text.
- **Progress Beams:** Instead of standard progress bars, use thin "Beams" of light that have a slight gradient trail.
- **Terminal Snippets:** Code blocks should have a distinct header bar with "traffic light" window controls (red, yellow, green) to lean into the OS/Terminal aesthetic.