import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/admin/EventForm';
import { EventTable } from '../components/admin/EventTable';
import { Layout, Button, LoadingSpinner } from '../components/shared';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import type { Event, EventInput } from '../types';

type Mode = 'list' | 'create' | 'edit';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, loading, refreshEvents, createEvent, updateEvent, deleteEvent } = useEvents();
  const { signOut } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [mode, setMode] = useState<Mode>('list');
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const handleCreate = async (data: EventInput) => {
    try {
      await createEvent(data);
      showSuccess('Event created successfully!');
      setMode('list');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Failed to create event');
      throw error;
    }
  };

  const handleUpdate = async (data: EventInput) => {
    if (!editingEvent) return;
    
    try {
      await updateEvent(editingEvent.id, data);
      showSuccess('Event updated successfully!');
      setMode('list');
      setEditingEvent(undefined);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Failed to update event');
      throw error;
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setMode('edit');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteEvent(id);
      showSuccess('Event deleted successfully!');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Failed to delete event');
    }
  };

  const handleCancel = () => {
    setMode('list');
    setEditingEvent(undefined);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      showError('Failed to sign out');
    }
  };

  return (
    <Layout>
      <div className="page-transition py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
              View Landing Page
            </Button>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {mode === 'list' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Events</h2>
              <Button variant="primary" onClick={() => setMode('create')}>
                Create New Event
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" message="Loading events..." />
              </div>
            ) : (
              <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
        )}

        {mode === 'create' && (
          <div className="max-w-2xl">
            <EventForm onSubmit={handleCreate} onCancel={handleCancel} />
          </div>
        )}

        {mode === 'edit' && editingEvent && (
          <div className="max-w-2xl">
            <EventForm event={editingEvent} onSubmit={handleUpdate} onCancel={handleCancel} />
          </div>
        )}
      </div>
    </Layout>
  );
};
