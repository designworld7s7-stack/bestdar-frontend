"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [localProfile, setLocalProfile] = useState(profile);
  const [editMode, setEditMode] = useState(false);
  const [formFullName, setFormFullName] = useState('');
  const [formAvatarUrl, setFormAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  useEffect(() => {
    if (localProfile) {
      setFormFullName(localProfile.full_name ?? '');
      setFormAvatarUrl(localProfile.avatar_url ?? '');
    }
  }, [localProfile]);

  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      if (!user) return;
      if (localProfile) return;
      try {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
        if (!mounted) return;
        setLocalProfile(data ?? null);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [user, localProfile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setUpdateError(null);
    setUpdateMessage(null);
    if (!user) return;
    setSaving(true);
    try {
      const updates: any = {
        full_name: formFullName || null,
        avatar_url: formAvatarUrl || null,
      };

      const { error, data } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .maybeSingle();

      if (error) {
        setUpdateError(error.message ?? 'Failed to update profile');
      } else {
        setLocalProfile(data ?? null);
        setUpdateMessage('Profile updated');
        setEditMode(false);
      }
    } catch (err: any) {
      setUpdateError(err?.message ?? 'Unexpected error');
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [loading, user, router]);

  if (loading || (!user && !localProfile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-600">Loading profile…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name ?? user?.email ?? 'Avatar'}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-semibold">
                {(profile?.full_name ?? user?.email ?? '')?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{localProfile?.full_name ?? user?.email}</h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Edit profile
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                    router.push('/auth/login');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button onClick={() => setEditMode(false)} className="px-3 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
            )}
          </div>
        </div>

        {editMode ? (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            {updateError && <div className="text-sm text-red-700">{updateError}</div>}
            {updateMessage && <div className="text-sm text-green-700">{updateMessage}</div>}

            <div>
              <label className="block text-sm text-gray-700 mb-1">Full name</label>
              <input
                value={formFullName}
                onChange={(e) => setFormFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Avatar URL</label>
              <input
                value={formAvatarUrl}
                onChange={(e) => setFormAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="px-3 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
            </div>
          </form>
        ) : (
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-xs text-gray-500">User ID</p>
              <p className="text-sm font-medium text-gray-800 break-words">{localProfile?.id ?? user?.id}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-xs text-gray-500">Full name</p>
              <p className="text-sm font-medium text-gray-800">{localProfile?.full_name ?? '-'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-medium text-gray-800">{localProfile?.role ?? 'user'}</p>
              <p className="text-xs text-gray-500 mt-2">Investor?</p>
              <p className="text-sm font-medium text-gray-800">{localProfile?.is_investor ? 'Yes' : 'No'}</p>
            </div>
          </div>
      </div>
    </div>
  );
}
