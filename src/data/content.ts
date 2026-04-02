import type { CareerCard, RecordEntry, MomentImage, StatItem, NavLink, SocialLink } from '../types';

export const careerCards: CareerCard[] = [
  {
    id: 'international-debut',
    title: 'International Debut',
    description: 'Made his ODI debut against Sri Lanka in August 2008 at the age of 19, marking the start of a legendary career.',
    imageUrl: '/download (2).jpeg',
    imageAlt: 'Virat Kohli during his international cricket debut',
  },
  {
    id: 'world-cup-2011',
    title: '2011 World Cup Victory',
    description: 'Played a pivotal role in India\'s 2011 ICC Cricket World Cup triumph, cementing his place among cricket greats.',
    imageUrl: '/30,130 Virat Kohli Photos & High Res Pictures - Getty Images.jpeg',
    imageAlt: 'Virat Kohli celebrating the 2011 World Cup victory',
  },
  {
    id: 'test-captaincy',
    title: 'Test Captaincy Era',
    description: 'Led India to historic overseas Test series wins and transformed the team into the most dominant force in world cricket.',
    imageUrl: '/Virat Kohli Cover drive.jpeg',
    imageAlt: 'Virat Kohli as Test captain leading the Indian cricket team',
  },
  {
    id: 'icc-awards',
    title: 'ICC Awards & Rankings',
    description: 'Multiple ICC Cricketer of the Year awards and prolonged stints as the number one ranked batsman across formats.',
    imageUrl: '/download (1).jpeg',
    imageAlt: 'Virat Kohli receiving ICC awards and accolades',
  },
];

export const records: RecordEntry[] = [
  {
    id: 'fastest-odi-runs',
    title: 'Fastest to 8000–12000 ODI Runs',
    detail: 'Reached every 1000-run milestone from 8000 to 12000 faster than any batsman in ODI history.',
  },
  {
    id: 'successful-chases',
    title: 'Most Successful Chases',
    detail: 'Holds the record for most successful run chases in ODI cricket, earning the title "Chase Master".',
  },
  {
    id: 'icc-player-awards',
    title: 'ICC Player Awards',
    detail: 'Won the ICC Cricketer of the Year and ICC ODI Player of the Year awards multiple times.',
  },
  {
    id: 'ipl-records',
    title: 'IPL Records',
    detail: 'All-time leading run-scorer in IPL history with multiple Orange Cap wins for Royal Challengers Bangalore.',
  },
];

export const moments: MomentImage[] = [
  {
    id: 'cover-drive',
    imageUrl: '/Virat Kohli Cover drive.jpeg',
    alt: 'Virat Kohli playing a signature cover drive',
    parallaxSpeed: 0.3,
  },
  {
    id: 'celebration',
    imageUrl: '/30,130 Virat Kohli Photos & High Res Pictures - Getty Images.jpeg',
    alt: 'Virat Kohli celebrating a century with arms raised',
    parallaxSpeed: 0.5,
  },
  {
    id: 'century-shot',
    imageUrl: '/download (1).jpeg',
    alt: 'Virat Kohli hitting the shot that completed his century',
    parallaxSpeed: 0.2,
  },
  {
    id: 'aggression',
    imageUrl: '/download (2).jpeg',
    alt: 'Virat Kohli showing his trademark aggressive celebration',
    parallaxSpeed: 0.4,
  },
];

export const stats: StatItem[] = [
  {
    id: 'centuries',
    value: 80,
    suffix: '+',
    label: 'International Centuries',
  },
  {
    id: 'runs',
    value: 25000,
    suffix: '+',
    label: 'Runs',
  },
  {
    id: 'rankings',
    value: 1,
    suffix: '',
    label: '#1 Rankings',
  },
];

export const navLinks: NavLink[] = [
  { label: 'Home', targetId: 'hero' },
  { label: 'Career', targetId: 'career' },
  { label: 'Records', targetId: 'records' },
  { label: 'Legacy', targetId: 'moments' },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/virat.kohli/',
    ariaLabel: 'Follow Virat Kohli on Instagram',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/imVkohli',
    ariaLabel: 'Follow Virat Kohli on Twitter',
  },
  {
    platform: 'facebook',
    url: 'https://www.facebook.com/virat.kohli',
    ariaLabel: 'Follow Virat Kohli on Facebook',
  },
];

export const rotatingWords: string[] = ['Passion', 'Aggression', 'Legacy'];

export const heroRoles: string[] = ['Run Machine', 'Captain', 'Chase Master', 'Icon'];
