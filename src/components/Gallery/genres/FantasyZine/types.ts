// Define interfaces and types for FantasyZine components and animations

export interface FantasyAnimationConfig {
  orbCount: number;
  glitterCount: number;
  bubbleCount: number;
  runeCount: number;
  // Add other configuration options as needed
}

export interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
  // Add other section-specific data
}

// Add other types or interfaces as the component grows 