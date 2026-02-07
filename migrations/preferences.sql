-- Add preferences columns to profiles table
-- Run this migration in your Supabase SQL editor

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS budget_min INTEGER,
ADD COLUMN IF NOT EXISTS budget_max INTEGER,
ADD COLUMN IF NOT EXISTS purpose_of_purchase TEXT,
ADD COLUMN IF NOT EXISTS countries_of_interest TEXT[],
ADD COLUMN IF NOT EXISTS property_types TEXT[],
ADD COLUMN IF NOT EXISTS has_completed_preferences BOOLEAN DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN profiles.budget_min IS 'Minimum budget preference for property search';
COMMENT ON COLUMN profiles.budget_max IS 'Maximum budget preference for property search';
COMMENT ON COLUMN profiles.purpose_of_purchase IS 'Purpose of property purchase (e.g., Personal Residence, Investment)';
COMMENT ON COLUMN profiles.countries_of_interest IS 'Array of countries user is interested in';
COMMENT ON COLUMN profiles.property_types IS 'Array of property types user is interested in (e.g., Apartments, Villas)';
COMMENT ON COLUMN profiles.has_completed_preferences IS 'Whether user has completed the preferences onboarding page';
