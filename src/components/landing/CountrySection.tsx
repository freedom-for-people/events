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
    <div>
      {/* Compact country header */}
      <div className="bg-gray-100 border-y border-gray-300 px-3 py-1 sticky top-0 z-10">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          {flag && <span className="text-base">{flag}</span>}
          <span>{country}</span>
          <span className="ml-auto text-xs font-normal text-gray-600">
            {events.length}
          </span>
        </h2>
      </div>
      
      {/* List view - no grid, just stacked */}
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
