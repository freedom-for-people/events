import React from 'react';
import type { Event } from '../../types';
import { EventCard } from './EventCard';

interface CountrySectionProps {
  country: string;
  events: Event[];
}

export const CountrySection: React.FC<CountrySectionProps> = ({ country, events }) => {
  return (
    <div className="mb-4">
      {/* Compact heading */}
      <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
        {country}
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
