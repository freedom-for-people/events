-- Enable Row Level Security on events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Events are viewable by everyone (public read access)
CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  USING (true);

-- Policy: Events are insertable by authenticated users only
CREATE POLICY "Events are insertable by authenticated users"
  ON events
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Events are updatable by authenticated users only
CREATE POLICY "Events are updatable by authenticated users"
  ON events
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Events are deletable by authenticated users only
CREATE POLICY "Events are deletable by authenticated users"
  ON events
  FOR DELETE
  USING (auth.role() = 'authenticated');
