import React from 'react';
import type { Event } from '../../types';
import { useToast } from '../../contexts/ToastContext';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { showSuccess, showError } = useToast();

  // Format date without year
  // Parse date components directly to avoid timezone conversion issues
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(event.city);
      showSuccess('Address copied to clipboard!');
    } catch (error) {
      showError('Failed to copy address');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white border-b border-gray-200 px-3 py-1 hover:bg-blue-50 transition-colors duration-150 cursor-pointer active:bg-blue-100"
    >
      {/* Title and Date with Description in one line */}
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="text-sm font-semibold text-gray-900 truncate flex-1">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs font-medium text-blue-600 whitespace-nowrap">
            {formatDate(event.date)}
          </span>
          <span className="text-xs text-gray-400">-</span>
          <span className="text-xs text-gray-600 whitespace-nowrap">
            {event.description}
          </span>
        </div>
      </div>
      
      {/* City in second line */}
      <div className="flex items-center text-xs text-gray-500">
        <span className="truncate">{event.city}</span>
      </div>
    </div>
  );
};
