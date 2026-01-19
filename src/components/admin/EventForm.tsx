import React, { useState, useEffect } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import type { Event, EventInput } from '../../types';
import { COUNTRIES } from '../../data/countries';

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

  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryFlag, setCountryFlag] = useState('');

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
      
      // Parse country name and flag (e.g., "United States 🇺🇸")
      const countryMatch = event.country.match(/^(.+?)\s+([\u{1F1E6}-\u{1F1FF}]{2})$/u);
      if (countryMatch) {
        setCountryName(countryMatch[1].trim());
        setCountryFlag(countryMatch[2]);
      } else {
        setCountryName(event.country);
        setCountryFlag('');
      }
      
      // Parse time range from description (e.g., "2pm-4pm")
      const timeMatch = event.description.match(/^(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)$/i);
      if (timeMatch) {
        // Convert to 24-hour format for time input
        setTimeFrom(convertTo24Hour(timeMatch[1].trim()));
        setTimeTo(convertTo24Hour(timeMatch[2].trim()));
      }
    }
  }, [event]);

  // Update country when name or flag changes
  useEffect(() => {
    if (countryName) {
      setFormData((prev) => ({
        ...prev,
        country: countryFlag ? `${countryName} ${countryFlag}` : countryName,
      }));
    }
  }, [countryName, countryFlag]);

  // Convert 12-hour format to 24-hour format for time input
  const convertTo24Hour = (time12h: string): string => {
    const match = time12h.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (!match) return '';
    
    let hours = parseInt(match[1]);
    const minutes = match[2] || '00';
    const period = match[3].toLowerCase();
    
    if (period === 'pm' && hours !== 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  // Convert 24-hour format to 12-hour format for display
  const convertTo12Hour = (time24h: string): string => {
    if (!time24h) return '';
    
    const [hours, minutes] = time24h.split(':').map(Number);
    const period = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    
    // Only show minutes if they're not :00
    if (minutes === 0) {
      return `${displayHours}${period}`;
    }
    return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`;
  };

  // Update description when time changes
  useEffect(() => {
    if (timeFrom && timeTo) {
      const fromFormatted = convertTo12Hour(timeFrom);
      const toFormatted = convertTo12Hour(timeTo);
      setFormData((prev) => ({
        ...prev,
        description: `${fromFormatted}-${toFormatted}`,
      }));
    }
  }, [timeFrom, timeTo]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EventInput, string>> = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    // Description validation (stored as description but labeled as Time in UI)
    if (!timeFrom.trim() || !timeTo.trim()) {
      newErrors.description = 'Both From and To times are required';
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
    if (!countryName.trim()) {
      newErrors.country = 'Country is required';
    } else if (countryName.trim().length > 100) {
      newErrors.country = 'Country must be 100 characters or less';
    }
    
    // Flag validation (optional but if provided, must be emoji)
    if (countryFlag && !/^[\u{1F1E6}-\u{1F1FF}]{2}$/u.test(countryFlag)) {
      newErrors.country = 'Flag must be a valid flag emoji';
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

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="From"
            type="time"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            disabled={loading}
          />
          <Input
            label="To"
            type="time"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            disabled={loading}
          />
        </div>
        {errors.description && (
          <p className="text-sm text-red-600 -mt-2">{errors.description}</p>
        )}

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          disabled={loading}
        />

        <div className="w-full">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            value={countryName}
            onChange={(e) => {
              const selectedCountry = COUNTRIES.find(c => c.name === e.target.value);
              setCountryName(e.target.value);
              setCountryFlag(selectedCountry?.flag || '');
            }}
            disabled={loading}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${errors.country ? 'border-red-500' : 'border-gray-300'}
            `}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country.name} value={country.name}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

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
