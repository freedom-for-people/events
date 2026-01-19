import React, { useMemo } from 'react';
import type { Event } from '../../types';
import { CountrySection } from './CountrySection';

interface EventListProps {
  events: Event[];
}

interface CountryGroup {
  country: string;
  events: Event[];
  cityCount: number;
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  // Group events by country and calculate city counts
  const groupedAndSortedEvents = useMemo(() => {
    // Group events by country
    const countryMap = new Map<string, Event[]>();
    
    events.forEach((event) => {
      const existing = countryMap.get(event.country) || [];
      countryMap.set(event.country, [...existing, event]);
    });

    // Create country groups with city counts
    const countryGroups: CountryGroup[] = Array.from(countryMap.entries()).map(
      ([country, countryEvents]) => {
        // Count unique cities for this country
        const uniqueCities = new Set(countryEvents.map((e) => e.city));
        
        return {
          country,
          events: countryEvents,
          cityCount: uniqueCities.size,
        };
      }
    );

    // Sort countries by city count (descending), then alphabetically
    countryGroups.sort((a, b) => {
      if (b.cityCount !== a.cityCount) {
        return b.cityCount - a.cityCount;
      }
      return a.country.localeCompare(b.country);
    });

    return countryGroups;
  }, [events]);

  // Handle empty state
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No events available</h3>
        <p className="mt-2 text-sm text-gray-500">
          There are currently no events to display. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {groupedAndSortedEvents.map((group, index) => (
        <div
          key={group.country}
          className={`animate-fade-in${index < 3 ? `-delay-${index + 1}` : ''}`}
        >
          <CountrySection
            country={group.country}
            events={group.events}
          />
        </div>
      ))}
    </div>
  );
};
