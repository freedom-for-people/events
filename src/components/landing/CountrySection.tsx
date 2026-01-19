import React from 'react';
import type { Event } from '../../types';
import { EventCard } from './EventCard';
import { COUNTRIES } from '../../data/countries';

interface CountrySectionProps {
  country: string;
  events: Event[];
}

export const CountrySection: React.FC<CountrySectionProps> = ({ country, events }) => {
  // Find the flag for this country
  const countryData = COUNTRIES.find(c => c.name === country);
  const flag = countryData?.flag || '';

  return (
    <div className="mb-4">
      {/* Compact heading with flag */}
      <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1 flex items-center gap-2">
        {flag && <span className="text-2xl">{flag}</span>}
        <span>{country}</span>
      </h2>
      
      {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
