import { supabase } from './supabase';
import type { Event, EventInput } from '../types';

/**
 * Event Service
 * Provides CRUD operations for events with Supabase backend
 */

/**
 * Fetch all events from the database
 * @returns Promise resolving to array of all events
 * @throws Error if database query fails
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching events');
  }
}

/**
 * Fetch only upcoming events (today and future dates)
 * @returns Promise resolving to array of upcoming events
 * @throws Error if database query fails
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', todayStr)
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch upcoming events: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching upcoming events');
  }
}

/**
 * Fetch events filtered by country
 * @param country - The country to filter by
 * @returns Promise resolving to array of events in the specified country
 * @throws Error if database query fails
 */
export async function getEventsByCountry(country: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('country', country)
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch events for country ${country}: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching events by country');
  }
}

/**
 * Create a new event in the database
 * @param eventData - The event data to create
 * @returns Promise resolving to the created event
 * @throws Error if validation fails or database insert fails
 */
export async function createEvent(eventData: EventInput): Promise<Event> {
  try {
    // Validate required fields
    if (!eventData.title?.trim()) {
      throw new Error('Event title is required');
    }
    if (!eventData.description?.trim()) {
      throw new Error('Event description is required');
    }
    if (!eventData.date) {
      throw new Error('Event date is required');
    }
    if (!eventData.country?.trim()) {
      throw new Error('Event country is required');
    }
    if (!eventData.city?.trim()) {
      throw new Error('Event city is required');
    }

    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }

    if (!data) {
      throw new Error('Failed to create event: No data returned');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while creating event');
  }
}

/**
 * Update an existing event in the database
 * @param id - The ID of the event to update
 * @param eventData - The updated event data
 * @returns Promise resolving to the updated event
 * @throws Error if validation fails or database update fails
 */
export async function updateEvent(id: string, eventData: EventInput): Promise<Event> {
  try {
    // Validate required fields
    if (!eventData.title?.trim()) {
      throw new Error('Event title is required');
    }
    if (!eventData.description?.trim()) {
      throw new Error('Event description is required');
    }
    if (!eventData.date) {
      throw new Error('Event date is required');
    }
    if (!eventData.country?.trim()) {
      throw new Error('Event country is required');
    }
    if (!eventData.city?.trim()) {
      throw new Error('Event city is required');
    }

    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update event: ${error.message}`);
    }

    if (!data) {
      throw new Error('Failed to update event: No data returned');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while updating event');
  }
}

/**
 * Delete an event from the database
 * @param id - The ID of the event to delete
 * @returns Promise resolving when deletion is complete
 * @throws Error if database delete fails
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while deleting event');
  }
}
