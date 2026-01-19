# Supabase Database Migrations

This directory contains SQL migration files for the Event Landing Page application.

## Migration Files

1. **001_create_events_table.sql** - Creates the events table with all required columns and indexes
2. **002_enable_rls_policies.sql** - Enables Row Level Security and creates access policies

## How to Apply Migrations

### Option 1: Using Supabase Dashboard (Recommended for initial setup)

1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of each migration file in order
4. Execute each migration

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

### Option 3: Manual Execution

1. Connect to your Supabase PostgreSQL database
2. Execute the migration files in order:
   - First: `001_create_events_table.sql`
   - Second: `002_enable_rls_policies.sql`

## Database Schema

### Events Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| title | TEXT | NOT NULL |
| description | TEXT | NOT NULL |
| date | DATE | NOT NULL |
| country | TEXT | NOT NULL |
| city | TEXT | NOT NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

### Indexes

- `idx_events_country` - Index on country column for faster filtering
- `idx_events_city` - Index on city column for faster filtering
- `idx_events_date` - Index on date column for faster sorting

### Row Level Security Policies

- **Public Read Access**: Anyone can view events (SELECT)
- **Authenticated Write Access**: Only authenticated users can:
  - Create events (INSERT)
  - Update events (UPDATE)
  - Delete events (DELETE)

## Verification

After applying migrations, verify the setup:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables WHERE table_name = 'events';

-- Check if indexes exist
SELECT * FROM pg_indexes WHERE tablename = 'events';

-- Check if RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'events';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'events';
```

## Creating an Admin User

After setting up the database, create an admin user through the Supabase dashboard:

1. Go to Authentication > Users
2. Click "Add User"
3. Enter email and password
4. Confirm the user
5. Use these credentials to log in to the admin panel
