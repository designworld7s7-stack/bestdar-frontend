-- Add investor_tier column to profiles table
-- This column stores the tier for users with role='investor'
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS investor_tier TEXT CHECK (investor_tier IN ('silver', 'gold', 'platinum'));

-- Create index for faster tier lookups
CREATE INDEX IF NOT EXISTS idx_profiles_investor_tier ON profiles(investor_tier);

-- =====================================================
-- RLS POLICIES FOR ADMIN ASSIGNMENT
-- =====================================================

-- Drop existing policies if they exist (to recreate them)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update their own profile (BUT NOT role or investor_tier)
CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND role = (SELECT role FROM profiles WHERE id = auth.uid()) -- Cannot change own role
  AND investor_tier IS NOT DISTINCT FROM (SELECT investor_tier FROM profiles WHERE id = auth.uid()) -- Cannot change own tier
);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Policy: Admins can update all profiles (including role and investor_tier)
CREATE POLICY "Admins can update all profiles"
ON profiles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Policy: Allow inserts for new users (signup)
CREATE POLICY "Allow profile creation on signup"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON COLUMN profiles.investor_tier IS 'Investor membership tier: silver, gold, or platinum. Only applicable when role=investor';
COMMENT ON TABLE profiles IS 'User profiles with role-based access control. Admins can assign investor roles and tiers manually.';
