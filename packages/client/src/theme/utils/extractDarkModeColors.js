/**
 * Helper script to convert Figma dark mode hex colors to RGB format
 *
 * INSTRUCTIONS:
 * 1. In Figma, switch to the Dark mode variable set (or find Dark/* variables)
 * 2. Copy the hex values for all 32 colors
 * 3. Replace the hex values in the darkColors object below
 * 4. Run: node extractDarkModeColors.js
 *
 * This will output the RGB format needed for dark.ts
 */

// Dark mode colors from Figma (extracted from screenshots)
const darkColors = {
  'rgb-background': '#09090b', // Dark/background
  'rgb-foreground': '#fafafa', // Dark/foreground
  'rgb-card': '#09090b', // Dark/card
  'rgb-card-foreground': '#fafafa', // Dark/card-foreground
  'rgb-popover': '#09090b', // Dark/popover
  'rgb-popover-foreground': '#fafafa', // Dark/popover-foreground
  'rgb-primary': '#fafafa', // Dark/primary
  'rgb-primary-foreground': '#18181b', // Dark/primary-foreground
  'rgb-secondary': '#27272a', // Dark/secondary
  'rgb-secondary-foreground': '#fafafa', // Dark/secondary-foreground
  'rgb-muted': '#27272a', // Dark/muted
  'rgb-muted-foreground': '#a1a1aa', // Dark/muted-foreground
  'rgb-accent': '#27272a', // Dark/accent
  'rgb-accent-foreground': '#fafafa', // Dark/accent-foreground
  'rgb-destructive': '#7f1d1d', // Dark/destructive
  'rgb-destructive-foreground': '#fafafa', // Dark/destructive-foreground
  'rgb-border': '#27272a', // Dark/border
  'rgb-input': '#27272a', // Dark/input
  'rgb-ring': '#d4d4d8', // Dark/ring
  'rgb-sidebar-background': '#18181b', // Dark/sidebar-background
  'rgb-sidebar-foreground': '#f4f4f5', // Dark/sidebar-foreground
  'rgb-sidebar-primary': '#1d4ed8', // Dark/sidebar-primary
  'rgb-sidebar-primary-foreground': '#d4d4d8', // Dark/sidebar-primary-foreground
  'rgb-sidebar-accent': '#27272a', // Dark/sidebar-accent
  'rgb-sidebar-accent-foreground': '#f4f4f5', // Dark/sidebar-accent-foreground
  'rgb-sidebar-border': '#27272a', // Dark/sidebar-border
  'rgb-sidebar-ring': '#3b82f6', // Dark/sidebar-ring
  'rgb-chart-1': '#2662d9', // Dark/chart-1
  'rgb-chart-2': '#e23670', // Dark/chart-2
  'rgb-chart-3': '#e88c30', // Dark/chart-3
  'rgb-chart-4': '#af57db', // Dark/chart-4
  'rgb-chart-5': '#2eb88a', // Dark/chart-5
};

/**
 * Convert hex color to space-separated RGB
 */
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

// Convert all colors
const rgbColors = {};
for (const [key, hex] of Object.entries(darkColors)) {
  rgbColors[key] = hexToRgb(hex);
}

// Output formatted for TypeScript
console.log('// Dark mode colors from Figma\n');
console.log('export const darkColors = {');
for (const [key, rgb] of Object.entries(rgbColors)) {
  const hex = darkColors[key];
  console.log(`  '${key}': '${rgb}', // ${hex}`);
}
console.log('};');
