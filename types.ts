export interface JourneyItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  tagline: string;
}

export interface SectionData {
  id: string;
  title: string;
  description: string;
  tagline: string;
  items: JourneyItem[];
  variant: 'light' | 'dark' | 'image';
}

export interface MoodOption {
  id: string;
  label: string;
  targetSection: string;
}

export enum PlayerState {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED'
}