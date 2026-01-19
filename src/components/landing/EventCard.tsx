import React from 'react';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format date to be more compact
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 hover:shadow-md hover:border-gray-300 transition-all duration-200">
      {/* Compact heading */}
      <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
        {event.title}
      </h3>
      
      {/* Compact description with line clamp */}
      <p className="text-xs text-gray-600 mb-2 leading-snug line-clamp-2">
        {event.description}
      </p>
      
      {/* Compact metadata - stacked layout */}
      <div className="space-y-1 text-xs text-gray-500">
        <div className="flex items-center">
          <svg
            className="w-3 h-3 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate">{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center">
          <svg
            className="w-3 h-3 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">{event.city}</span>
        </div>
      </div>
    </div>
  );
};
