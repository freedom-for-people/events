import { supabase } from './supabase';
import type { User } from '../types';
import type { Session } from '@supabase/supabase-js';

/**
 * Authentication service for managing user authentication with Supabase
 */

/**
 * Sign in with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise with user and session data
 * @throws Error if authentication fails
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: User; session: Session }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user || !data.session) {
      throw new Error('Authentication failed: No user or session returned');
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
    };

    return { user, session: data.session };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during sign in');
  }
}

/**
 * Sign out the current user
 * @throws Error if sign out fails
 */
export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during sign out');
  }
}

/**
 * Get the current session
 * @returns Promise with current session or null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return data.session;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while getting session');
  }
}

/**
 * Listen to authentication state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function to stop listening
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
): () => void {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  // Return unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}
