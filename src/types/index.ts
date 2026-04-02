export interface CareerCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface RecordEntry {
  id: string;
  title: string;
  detail: string;
}

export interface MomentImage {
  id: string;
  imageUrl: string;
  alt: string;
  parallaxSpeed: number;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  targetId: string;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'facebook';
  url: string;
  ariaLabel: string;
}
