
import type { Country, Badge } from './types';

export const COUNTRIES: Country[] = [
  // Africa
  { code: 'ng', name: 'Nigeria', continent: 'Africa' },
  { code: 'eg', name: 'Egypt', continent: 'Africa' },
  { code: 'za', name: 'South Africa', continent: 'Africa' },
  { code: 'ke', name: 'Kenya', continent: 'Africa' },
  { code: 'gh', name: 'Ghana', continent: 'Africa' },
  
  // Asia
  { code: 'cn', name: 'China', continent: 'Asia' },
  { code: 'in', name: 'India', continent: 'Asia' },
  { code: 'jp', name: 'Japan', continent: 'Asia' },
  { code: 'kr', name: 'South Korea', continent: 'Asia' },
  { code: 'th', name: 'Thailand', continent: 'Asia' },
  
  // Europe
  { code: 'de', name: 'Germany', continent: 'Europe' },
  { code: 'fr', name: 'France', continent: 'Europe' },
  { code: 'it', name: 'Italy', continent: 'Europe' },
  { code: 'es', name: 'Spain', continent: 'Europe' },
  { code: 'gb', name: 'United Kingdom', continent: 'Europe' },
  
  // North America
  { code: 'us', name: 'United States', continent: 'North America' },
  { code: 'ca', name: 'Canada', continent: 'North America' },
  { code: 'mx', name: 'Mexico', continent: 'North America' },
  { code: 'cu', name: 'Cuba', continent: 'North America' },
  { code: 'jm', name: 'Jamaica', continent: 'North America' },
  
  // South America
  { code: 'br', name: 'Brazil', continent: 'South America' },
  { code: 'ar', name: 'Argentina', continent: 'South America' },
  { code: 'co', name: 'Colombia', continent: 'South America' },
  { code: 'cl', name: 'Chile', continent: 'South America' },
  { code: 'pe', name: 'Peru', continent: 'South America' },
  
  // Oceania
  { code: 'au', name: 'Australia', continent: 'Oceania' },
  { code: 'nz', name: 'New Zealand', continent: 'Oceania' },
  { code: 'fj', name: 'Fiji', continent: 'Oceania' },
  { code: 'pg', name: 'Papua New Guinea', continent: 'Oceania' },
  { code: 'ws', name: 'Samoa', continent: 'Oceania' },
];

export const BADGES: Record<string, Badge> = {
    // Milestones
    'unlock-10': { id: 'unlock-10', name: 'Apprentice Vexillologist', description: 'Unlock 10 flags in your Flag Book.', type: 'milestone' },
    'unlock-all': { id: 'unlock-all', name: 'Globe Master', description: 'Unlock all flags in your Flag Book!', type: 'milestone' },
    // Continents
    'continent-europe': { id: 'continent-europe', name: 'European Expert', description: 'Unlock all flags from Europe.', type: 'continent' },
    'continent-asia': { id: 'continent-asia', name: 'Master of Asia', description: 'Unlock all flags from Asia.', type: 'continent' },
    'continent-africa': { id: 'continent-africa', name: 'African Explorer', description: 'Unlock all flags from Africa.', type: 'continent' },
    'continent-north-america': { id: 'continent-north-america', name: 'North American Navigator', description: 'Unlock all flags from North America.', type: 'continent' },
    'continent-south-america': { id: 'continent-south-america', name: 'South American Sage', description: 'Unlock all flags from South America.', type: 'continent' },
    'continent-oceania': { id: 'continent-oceania', name: 'Oceania Voyager', description: 'Unlock all flags from Oceania.', type: 'continent' },
    // Streaks
    'streak-10': { id: 'streak-10', name: 'Quick Thinker', description: 'Get a streak of 10 in Lightning Round.', type: 'streak' },
    'streak-25': { id: 'streak-25', name: 'Unstoppable', description: 'Get a streak of 25 in Lightning Round.', type: 'streak' },
};
