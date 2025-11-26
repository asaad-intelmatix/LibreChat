import { IThemeRGB } from '../types';

/**
 * Default light theme - Figma Shadcn UI 2025 Kit colors
 * Source: https://www.figma.com/design/Jj5cQA5KqJvP0KdavksRae/Shadcn_ui-2025-kit--Community-?node-id=47-5051&m=dev&vars=1&var-set-id=133-12047
 * 
 * All 32 colors extracted from Figma design system.
 * Colors are converted from hex to space-separated RGB format.
 */
export const defaultTheme: IThemeRGB = {
  // Core colors
  'rgb-background': '255 255 255', // #ffffff
  'rgb-foreground': '9 9 11', // #09090b
  
  // Card colors
  'rgb-card': '255 255 255', // #ffffff
  'rgb-card-foreground': '9 9 11', // #09090b
  
  // Popover colors
  'rgb-popover': '255 255 255', // #ffffff
  'rgb-popover-foreground': '9 9 11', // #09090b
  
  // Primary colors
  'rgb-primary': '24 24 27', // #18181b
  'rgb-primary-foreground': '250 250 250', // #fafafa
  
  // Secondary colors
  'rgb-secondary': '244 244 245', // #f4f4f5
  'rgb-secondary-foreground': '24 24 27', // #18181b
  
  // Muted colors
  'rgb-muted': '244 244 245', // #f4f4f5
  'rgb-muted-foreground': '113 113 122', // #71717a
  
  // Accent colors
  'rgb-accent': '244 244 245', // #f4f4f5
  'rgb-accent-foreground': '24 24 27', // #18181b
  
  // Destructive colors
  'rgb-destructive': '239 68 68', // #ef4444
  'rgb-destructive-foreground': '250 250 250', // #fafafa
  
  // Border and input
  'rgb-border': '228 228 231', // #e4e4e7
  'rgb-input': '228 228 231', // #e4e4e7
  'rgb-ring': '24 24 27', // #18181b
  
  // Sidebar colors
  'rgb-sidebar-background': '250 250 250', // #fafafa
  'rgb-sidebar-foreground': '63 63 70', // #3f3f46
  'rgb-sidebar-primary': '24 24 27', // #18181b
  'rgb-sidebar-primary-foreground': '250 250 250', // #fafafa
  'rgb-sidebar-accent': '244 244 245', // #f4f4f5
  'rgb-sidebar-accent-foreground': '24 24 27', // #18181b
  'rgb-sidebar-border': '229 231 235', // #e5e7eb
  'rgb-sidebar-ring': '59 130 246', // #3b82f6
  
  // Chart colors
  'rgb-chart-1': '42 157 144', // #2a9d90
  'rgb-chart-2': '231 110 80', // #e76e50
  'rgb-chart-3': '39 71 84', // #274754
  'rgb-chart-4': '232 196 104', // #e8c468
  'rgb-chart-5': '244 164 98', // #f4a462
};
