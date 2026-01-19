import React, { useEffect } from 'react';
import { EventList } from '../components/landing/EventList';
import { Layout, LoadingSpinner } from '../components/shared';
import { useEvents } from '../contexts/EventContext';

export const LandingPage: React.FC = () => {
  const { events, loading, error, refreshUpcomingEvents } = useEvents();

  useEffect(() => {
    refreshUpcomingEvents();
  }, [refreshUpcomingEvents]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" message="Loading events..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Failed to Load Events
            </h2>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <button
              onClick={() => refreshUpcomingEvents()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition -mx-4 -mt-4">
        {/* Compact header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 shadow-sm">
          <h1 className="text-lg font-bold text-white">Upcoming Events</h1>
        </div>
        
        <EventList events={events} />
      </div>
    </Layout>
  );
};
