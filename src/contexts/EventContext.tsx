import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Event, EventInput } from '../types';
import * as eventService from '../services/eventService';

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshEvents: () => Promise<void>;
  refreshUpcomingEvents: () => Promise<void>;
  createEvent: (data: EventInput) => Promise<Event>;
  updateEvent: (id: string, data: EventInput) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await eventService.getAllEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(errorMessage);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUpcomingEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await eventService.getUpcomingEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch upcoming events';
      setError(errorMessage);
      console.error('Error fetching upcoming events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (data: EventInput): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await eventService.createEvent(data);
      // Update cache with new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create event';
      setError(errorMessage);
      console.error('Error creating event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, data: EventInput): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await eventService.updateEvent(id, data);
      // Update cache with updated event
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      );
      return updatedEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update event';
      setError(errorMessage);
      console.error('Error updating event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await eventService.deleteEvent(id);
      // Remove from cache
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete event';
      setError(errorMessage);
      console.error('Error deleting event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    events,
    loading,
    error,
    refreshEvents,
    refreshUpcomingEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
