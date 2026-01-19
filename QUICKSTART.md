# 🚀 Quick Start Guide

## Why is the landing page blank?

The landing page is blank because you need to:

1. **Set up Supabase** (backend database)
2. **Configure environment variables** (connection credentials)
3. **Run database migrations** (create tables)
4. **Add events to the database** (content to display)

## Step-by-Step Setup (5 minutes)

### 1️⃣ Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Choose a name and password
5. Wait ~2 minutes for setup to complete

### 2️⃣ Run Database Migrations

In your Supabase dashboard:

1. Click **SQL Editor** in the left sidebar
2. Copy and paste the contents of `supabase/migrations/001_create_events_table.sql`
3. Click **Run**
4. Copy and paste the contents of `supabase/migrations/002_enable_rls_policies.sql`
5. Click **Run**

### 3️⃣ Create Environment File

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **anon public key**
3. Create a file named `.env` in the `event-landing-page` folder:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4️⃣ Add Sample Events

In the Supabase SQL Editor, run:

```sql
INSERT INTO events (title, description, date, country, city) VALUES
  ('Tech Conference 2024', 'Annual technology conference', '2024-06-15', 'United States', 'San Francisco'),
  ('Web Summit', 'Europe''s largest tech conference', '2024-11-04', 'Portugal', 'Lisbon'),
  ('React Conference', 'Learn about React development', '2024-05-20', 'United States', 'New York');
```

### 5️⃣ Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

### 6️⃣ Create an Admin User (Optional)

To access the admin panel:

1. In Supabase, go to **Authentication > Users**
2. Click **Add user** > **Create new user**
3. Enter email and password
4. Go to [http://localhost:5173/login](http://localhost:5173/login)
5. Log in with your credentials

## ✅ Done!

Your landing page should now display events!

## 📚 Need More Help?

- See **SETUP.md** for detailed instructions
- Check the browser console (F12) for error messages
- Verify your `.env` file exists and has correct values
