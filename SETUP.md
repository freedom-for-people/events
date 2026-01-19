# Event Landing Page - Setup Guide

## Quick Start

### 1. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (takes ~2 minutes)

### 2. Run Database Migrations

Once your Supabase project is ready:

1. Go to the SQL Editor in your Supabase dashboard
2. Run the first migration (`supabase/migrations/001_create_events_table.sql`):
   - Copy the entire contents of the file
   - Paste into the SQL Editor
   - Click "Run"
3. Run the second migration (`supabase/migrations/002_enable_rls_policies.sql`):
   - Copy the entire contents of the file
   - Paste into the SQL Editor
   - Click "Run"

### 3. Create Environment Variables

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env` file in the `event-landing-page` directory:

```bash
cp .env.example .env
```

4. Edit the `.env` file and add your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create an Admin User

1. In your Supabase dashboard, go to **Authentication > Users**
2. Click "Add user" > "Create new user"
3. Enter an email and password (you'll use these to log into the admin panel)
4. Click "Create user"

### 5. Add Sample Events (Optional)

To test the landing page, add some sample events:

1. Go to the SQL Editor in Supabase
2. Run this query to add sample events:

```sql
INSERT INTO events (title, description, date, country, city) VALUES
  ('Tech Conference 2024', 'Annual technology conference featuring the latest innovations', '2024-06-15', 'United States', 'San Francisco'),
  ('Web Summit', 'Europe''s largest tech conference', '2024-11-04', 'Portugal', 'Lisbon'),
  ('React Conference', 'Learn about the latest in React development', '2024-05-20', 'United States', 'New York'),
  ('AI Summit', 'Exploring the future of artificial intelligence', '2024-09-10', 'United Kingdom', 'London'),
  ('DevOps Days', 'Best practices in DevOps and cloud infrastructure', '2024-07-22', 'Germany', 'Berlin'),
  ('Mobile Dev Conference', 'iOS and Android development conference', '2024-08-15', 'United States', 'Austin'),
  ('Data Science Summit', 'Latest trends in data science and machine learning', '2024-10-05', 'Canada', 'Toronto'),
  ('Cloud Expo', 'Cloud computing and infrastructure conference', '2024-06-30', 'United Kingdom', 'Manchester');
```

### 6. Start the Development Server

```bash
npm install
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### 7. Access the Admin Panel

1. Navigate to [http://localhost:5173/login](http://localhost:5173/login)
2. Log in with the admin credentials you created in step 4
3. You can now create, edit, and delete events

## Troubleshooting

### "Missing Supabase environment variables" Error

- Make sure you created the `.env` file in the `event-landing-page` directory
- Verify the environment variables are named correctly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart the development server after creating/modifying the `.env` file

### Blank Landing Page

- Check the browser console for errors (F12 > Console tab)
- Verify the database migrations have been run
- Make sure there are events in the database (run the sample events query above)
- Check that your Supabase project is active and not paused

### Can't Log In to Admin Panel

- Verify you created an admin user in Supabase Authentication
- Check that the email and password are correct
- Look for error messages in the browser console

### Database Connection Errors

- Verify your Supabase project URL and anon key are correct
- Check that your Supabase project is not paused (free tier projects pause after inactivity)
- Ensure Row Level Security policies have been applied (run migration 002)

## Deployment to Netlify

See the `.env.example` file for detailed Netlify deployment instructions.
