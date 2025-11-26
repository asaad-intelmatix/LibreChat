/**
 * Defines the color channels from Figma Shadcn UI 2025 Kit.
 * RGB values should be in format "255 255 255" (space-separated)
 * Only includes colors that exist in the Figma design system.
 */
export interface IThemeRGB {
  // Core colors
  'rgb-background'?: string;
  'rgb-foreground'?: string;
  
  // Card colors
  'rgb-card'?: string;
  'rgb-card-foreground'?: string;
  
  // Popover colors
  'rgb-popover'?: string;
  'rgb-popover-foreground'?: string;
  
  // Primary colors
  'rgb-primary'?: string;
  'rgb-primary-foreground'?: string;
  
  // Secondary colors
  'rgb-secondary'?: string;
  'rgb-secondary-foreground'?: string;
  
  // Muted colors
  'rgb-muted'?: string;
  'rgb-muted-foreground'?: string;
  
  // Accent colors
  'rgb-accent'?: string;
  'rgb-accent-foreground'?: string;
  
  // Destructive colors
  'rgb-destructive'?: string;
  'rgb-destructive-foreground'?: string;
  
  // Border and input
  'rgb-border'?: string;
  'rgb-input'?: string;
  'rgb-ring'?: string;
  
  // Sidebar colors
  'rgb-sidebar-background'?: string;
  'rgb-sidebar-foreground'?: string;
  'rgb-sidebar-primary'?: string;
  'rgb-sidebar-primary-foreground'?: string;
  'rgb-sidebar-accent'?: string;
  'rgb-sidebar-accent-foreground'?: string;
  'rgb-sidebar-border'?: string;
  'rgb-sidebar-ring'?: string;
  
  // Chart colors
  'rgb-chart-1'?: string;
  'rgb-chart-2'?: string;
  'rgb-chart-3'?: string;
  'rgb-chart-4'?: string;
  'rgb-chart-5'?: string;
}

/**
 * Name of the CSS variables used in tailwind.config
 * Only includes Figma design system variables
 */
export interface IThemeVariables {
  // Core variables
  '--background': string;
  '--foreground': string;
  
  // Card variables
  '--card': string;
  '--card-foreground': string;
  
  // Popover variables
  '--popover': string;
  '--popover-foreground': string;
  
  // Primary variables
  '--primary': string;
  '--primary-foreground': string;
  
  // Secondary variables
  '--secondary': string;
  '--secondary-foreground': string;
  
  // Muted variables
  '--muted': string;
  '--muted-foreground': string;
  
  // Accent variables
  '--accent': string;
  '--accent-foreground': string;
  
  // Destructive variables
  '--destructive': string;
  '--destructive-foreground': string;
  
  // Border and input
  '--border': string;
  '--input': string;
  '--ring': string;
  
  // Sidebar variables
  '--sidebar-background': string;
  '--sidebar-foreground': string;
  '--sidebar-primary': string;
  '--sidebar-primary-foreground': string;
  '--sidebar-accent': string;
  '--sidebar-accent-foreground': string;
  '--sidebar-border': string;
  '--sidebar-ring': string;
  
  // Chart variables
  '--chart-1': string;
  '--chart-2': string;
  '--chart-3': string;
  '--chart-4': string;
  '--chart-5': string;
}

/**
 * Name of the defined colors in the Tailwind theme
 * Only includes Figma design system colors
 */
export interface IThemeColors {
  // Core colors
  background?: string;
  foreground?: string;
  
  // Card colors
  card?: string;
  'card-foreground'?: string;
  
  // Popover colors
  popover?: string;
  'popover-foreground'?: string;
  
  // Primary colors
  primary?: string;
  'primary-foreground'?: string;
  
  // Secondary colors
  secondary?: string;
  'secondary-foreground'?: string;
  
  // Muted colors
  muted?: string;
  'muted-foreground'?: string;
  
  // Accent colors
  accent?: string;
  'accent-foreground'?: string;
  
  // Destructive colors
  destructive?: string;
  'destructive-foreground'?: string;
  
  // Border and input
  border?: string;
  input?: string;
  ring?: string;
  
  // Sidebar colors
  'sidebar-background'?: string;
  'sidebar-foreground'?: string;
  'sidebar-primary'?: string;
  'sidebar-primary-foreground'?: string;
  'sidebar-accent'?: string;
  'sidebar-accent-foreground'?: string;
  'sidebar-border'?: string;
  'sidebar-ring'?: string;
  
  // Chart colors
  'chart-1'?: string;
  'chart-2'?: string;
  'chart-3'?: string;
  'chart-4'?: string;
  'chart-5'?: string;
}

export interface Theme {
  name: string;
  colors: IThemeRGB;
}
