import React, { useState, useEffect } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import type { Event, EventInput } from '../../types';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventInput) => Promise<void>;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<EventInput>({
    title: '',
    description: '',
    date: '',
    country: '',
    city: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventInput, string>>>({});
  const [loading, setLoading] = useState(false);

  // Populate form when editing an existing event
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        country: event.country,
        city: event.city,
      });
    }
  }, [event]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EventInput, string>> = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    // Description validation (stored as description but labeled as Time in UI)
    if (!formData.description.trim()) {
      newErrors.description = 'Time is required';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Time must be 2000 characters or less';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (isNaN(selectedDate.getTime())) {
        newErrors.date = 'Please enter a valid date';
      } else if (!event && selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    } else if (formData.country.trim().length > 100) {
      newErrors.country = 'Country must be 100 characters or less';
    }

    // City validation (stored as city but labeled as Address in UI)
    if (!formData.city.trim()) {
      newErrors.city = 'Address is required';
    } else if (formData.city.trim().length > 100) {
      newErrors.city = 'Address must be 100 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Trim all string fields before submission
      const trimmedData: EventInput = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        country: formData.country.trim(),
        city: formData.city.trim(),
      };

      await onSubmit(trimmedData);
    } catch (error) {
      // Error handling is managed by parent component
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof EventInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {event ? 'Edit Event' : 'Create New Event'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          placeholder="Event title"
          disabled={loading}
          maxLength={200}
        />

        <div className="w-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Event time and additional details"
            disabled={loading}
            maxLength={2000}
            rows={4}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${errors.description ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          disabled={loading}
        />

        <Input
          label="Country"
          type="text"
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          error={errors.country}
          placeholder="Country name"
          disabled={loading}
          maxLength={100}
        />

        <Input
          label="Address"
          type="text"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
          placeholder="City or full address"
          disabled={loading}
          maxLength={100}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            {event ? 'Update Event' : 'Create Event'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
