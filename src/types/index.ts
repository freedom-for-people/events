import type { Session } from '@supabase/supabase-js';

// Event entity
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  country: string;
  city: string;
  created_at: string;
  updated_at: string;
}

// Event creation/update payload
export interface EventInput {
  title: string;
  description: string;
  date: string;
  country: string;
  city: string;
}

// User from Supabase
export interface User {
  id: string;
  email: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}
