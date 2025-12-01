import { IThemeRGB, IThemeVariables } from '../types';

/**
 * Validates RGB string format (e.g., "255 255 255")
 */
function validateRGB(rgb: string): boolean {
  if (!rgb) return true;
  const rgbRegex = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;
  const match = rgb.match(rgbRegex);

  if (!match) return false;

  // Check that each value is between 0-255
  const [, r, g, b] = match;
  return [r, g, b].every((val) => {
    const num = parseInt(val, 10);
    return num >= 0 && num <= 255;
  });
}

/**
 * Maps theme RGB values to CSS variables
 */
function mapTheme(rgb: IThemeRGB): Partial<IThemeVariables> {
  const variables: Partial<IThemeVariables> = {};

  // Map each RGB value to its corresponding CSS variable
  // Only includes Figma design system colors
  const mappings: Record<keyof IThemeRGB, keyof IThemeVariables> = {
    // Core colors
    'rgb-background': '--background',
    'rgb-foreground': '--foreground',

    // Card colors
    'rgb-card': '--card',
    'rgb-card-foreground': '--card-foreground',

    // Popover colors
    'rgb-popover': '--popover',
    'rgb-popover-foreground': '--popover-foreground',

    // Primary colors
    'rgb-primary': '--primary',
    'rgb-primary-foreground': '--primary-foreground',

    // Secondary colors
    'rgb-secondary': '--secondary',
    'rgb-secondary-foreground': '--secondary-foreground',

    // Muted colors
    'rgb-muted': '--muted',
    'rgb-muted-foreground': '--muted-foreground',

    // Accent colors
    'rgb-accent': '--accent',
    'rgb-accent-foreground': '--accent-foreground',

    // Destructive colors
    'rgb-destructive': '--destructive',
    'rgb-destructive-foreground': '--destructive-foreground',

    // Border and input
    'rgb-border': '--border',
    'rgb-input': '--input',
    'rgb-ring': '--ring',

    // Sidebar colors
    'rgb-sidebar-background': '--sidebar-background',
    'rgb-sidebar-foreground': '--sidebar-foreground',
    'rgb-sidebar-primary': '--sidebar-primary',
    'rgb-sidebar-primary-foreground': '--sidebar-primary-foreground',
    'rgb-sidebar-accent': '--sidebar-accent',
    'rgb-sidebar-accent-foreground': '--sidebar-accent-foreground',
    'rgb-sidebar-border': '--sidebar-border',
    'rgb-sidebar-ring': '--sidebar-ring',

    // Chart colors
    'rgb-chart-1': '--chart-1',
    'rgb-chart-2': '--chart-2',
    'rgb-chart-3': '--chart-3',
    'rgb-chart-4': '--chart-4',
    'rgb-chart-5': '--chart-5',
  };

  Object.entries(mappings).forEach(([rgbKey, cssVar]) => {
    const value = rgb[rgbKey as keyof IThemeRGB];
    if (value) {
      variables[cssVar] = value;
    }
  });

  return variables;
}

/**
 * Applies theme to the document root
 * Sets CSS variables as rgb() values for compatibility with existing CSS
 */
export default function applyTheme(themeRGB?: IThemeRGB) {
  if (!themeRGB) return;

  const themeObject = mapTheme(themeRGB);
  const root = document.documentElement;

  Object.entries(themeObject).forEach(([cssVar, value]) => {
    if (!value) return;

    const validation = validateRGB(value);
    if (!validation) {
      console.error(`Invalid RGB value for ${cssVar}: ${value}`);
      return;
    }

    // Set the CSS variable as rgb() value for compatibility
    // This ensures existing CSS that expects color values (not space-separated RGB) continues to work
    root.style.setProperty(cssVar, `rgb(${value})`);
  });
}
