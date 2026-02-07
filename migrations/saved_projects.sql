-- SQL Migration: Saved Projects Feature
-- Run this in your Supabase SQL Editor

-- Create saved_projects table
CREATE TABLE IF NOT EXISTS saved_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, project_id)
);

-- Enable RLS
ALTER TABLE saved_projects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own saved projects
CREATE POLICY "Users can insert their own saved projects"
ON saved_projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can view their own saved projects
CREATE POLICY "Users can view their own saved projects"
ON saved_projects FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can delete their own saved projects
CREATE POLICY "Users can delete their own saved projects"
ON saved_projects FOR DELETE
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_saved_projects_user_id ON saved_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_projects_project_id ON saved_projects(project_id);
