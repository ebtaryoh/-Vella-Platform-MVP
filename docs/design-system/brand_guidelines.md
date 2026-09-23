# Vella Mobility - UI/UX & Brand Design System

## 1. Brand Philosophy
Vella Mobility positions itself not as a standard "taxi app", but as a **Premium Mobility Operating System**. The design must evoke **trust, extreme speed, clarity, and sophistication**. 

**To stand out in Nigeria:**
* We avoid the generic bright Greens (Bolt/inDrive), Oranges (Rida), or Yellows (LagRide).
* We use a deeply sophisticated, FinTech-inspired palette that feels highly secure and professional.

## 2. Color Palette

### The Canvas (Dark & Light)
*   **Onyx Black (`#050505`)**: The core background for Dark Mode and premium elements.
*   **Slate Grey (`#1E293B`)**: Secondary background for cards and elevation.
*   **Crisp Snow (`#FFFFFF`)**: Pure white for Light Mode backgrounds to ensure maximum contrast and readability under the Nigerian sun.

### The Accents (Distinctive & Energetic)
*   **Primary Accent: Sapphire Blue (`#2563EB`)** - Used for primary actions, buttons, and active states. It communicates security and technology.
*   **Secondary Accent: Electric Violet (`#7C3AED`)** - Used sparingly for premium features (e.g., Scheduled Rides, Event Mobility, Trusted Driver requests) to create a "pro-level" effect.

### Functional Colors (Universal but refined)
*   **Success/Safe:** Neo-Mint (`#10B981`) - Used for "Good Opportunity" driver estimates and completed trips.
*   **Warning/Alert:** Amber (`#F59E0B`) - For waiting states and medium-risk notifications.
*   **Danger/SOS:** Crimson (`#E11D48`) - Specifically selected to be stark and unmistakable for SOS and cancellations.

## 3. Typography
*   **Primary Font:** **Plus Jakarta Sans** (or Inter as fallback).
*   **Why?** It has excellent legibility on small, low-resolution screens, highly geometric numbers (crucial for pricing and ETA), and a modern, premium architectural feel.

## 4. UI Characteristics (The "Pro" Effect)
1.  **Extreme Minimalism:** No unnecessary borders or chaotic dividers. We use subtle shading and generous whitespace to separate content.
2.  **Subtle Depth:** Drop shadows are minimal, heavily blurred, and tinted with the primary accent color rather than pure black, giving a "glowing" premium feel.
3.  **Micro-interactions:** Buttons slightly scale down on press. Loading states use elegant skeleton shimmers, avoiding generic spinning wheels where possible.
4.  **Glassmorphism (Restricted):** Used *only* for the bottom navigation bar and sticky headers to maintain a sense of space without cluttering the screen.
5.  **Iconography:** High-quality, consistent stroke-weight icons (e.g., Phosphor Icons or customized Lucide icons).

## 5. Mobile Considerations
*   **Bottom-Heavy Design:** All interactive elements (Request ride, Accept trip, SOS) are placed in the bottom 40% of the screen for easy thumb reach on large phones.
*   **High Contrast:** Essential for outdoor use in bright sunlight.
*   **Stateful UI:** Every button has a clear `default`, `pressed`, `loading`, and `disabled` state. No silent failures.
