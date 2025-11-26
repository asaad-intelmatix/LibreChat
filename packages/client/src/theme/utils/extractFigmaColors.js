/**
 * Helper script to convert Figma hex colors to RGB format
 * Usage: node extractFigmaColors.js
 */

// Light mode colors from Figma
const lightColors = {
  'rgb-background': '#ffffff',
  'rgb-foreground': '#09090b',
  'rgb-card': '#ffffff',
  'rgb-card-foreground': '#09090b',
  'rgb-popover': '#ffffff',
  'rgb-popover-foreground': '#09090b',
  'rgb-primary': '#18181b',
  'rgb-primary-foreground': '#fafafa',
  'rgb-secondary': '#f4f4f5',
  'rgb-secondary-foreground': '#18181b',
  'rgb-muted': '#f4f4f5',
  'rgb-muted-foreground': '#71717a',
  'rgb-accent': '#f4f4f5',
  'rgb-accent-foreground': '#18181b',
  'rgb-destructive': '#ef4444',
  'rgb-destructive-foreground': '#fafafa',
  'rgb-border': '#e4e4e7',
  'rgb-input': '#e4e4e7',
  'rgb-ring': '#18181b',
  'rgb-sidebar-background': '#fafafa',
  'rgb-sidebar-foreground': '#3f3f46',
  'rgb-sidebar-primary': '#18181b',
  'rgb-sidebar-primary-foreground': '#fafafa',
  'rgb-sidebar-accent': '#f4f4f5',
  'rgb-sidebar-accent-foreground': '#18181b',
  'rgb-sidebar-border': '#e5e7eb',
  'rgb-sidebar-ring': '#3b82f6',
  'rgb-chart-1': '#2a9d90',
  'rgb-chart-2': '#e76e50',
  'rgb-chart-3': '#274754',
  'rgb-chart-4': '#e8c468',
  'rgb-chart-5': '#f4a462',
};

/**
 * Convert hex color to space-separated RGB
 * @param {string} hex - Hex color (e.g., "#ffffff" or "ffffff")
 * @returns {string} - Space-separated RGB (e.g., "255 255 255")
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r} ${g} ${b}`;
}

// Convert all colors
const rgbColors = {};
for (const [key, hex] of Object.entries(lightColors)) {
  rgbColors[key] = hexToRgb(hex);
}

// Output formatted for TypeScript
console.log('// Light mode colors from Figma\n');
console.log('export const lightColors = {');
for (const [key, rgb] of Object.entries(rgbColors)) {
  const hex = lightColors[key];
  console.log(`  '${key}': '${rgb}', // ${hex}`);
}
console.log('};');

// Also output as JSON for easy copy-paste
console.log('\n// JSON format:\n');
console.log(JSON.stringify(rgbColors, null, 2));

