import React from 'react';
import type { Event } from '../../types';
import { EventCard } from './EventCard';

interface CountrySectionProps {
  country: string;
  events: Event[];
}

export const CountrySection: React.FC<CountrySectionProps> = ({ country, events }) => {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      {/* Responsive heading with adjusted sizing */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
        {country}
      </h2>
      
      {/* Responsive grid: Mobile (1 col), Tablet (2 cols), Desktop (3 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
