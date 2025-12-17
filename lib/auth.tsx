"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

type Profile = {
	id: string;
	full_name?: string | null;
	avatar_url?: string | null;
	[key: string]: any;
};

type AuthContextType = {
	user: User | null;
	profile: Profile | null;
	loading: boolean;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		async function init() {
			setLoading(true);
			try {
				const { data } = await supabase.auth.getUser();
				const currentUser = data?.user ?? null;
				if (!mounted) return;
				setUser(currentUser);
				if (currentUser) {
					await fetchProfile(currentUser.id);
				} else {
					setProfile(null);
				}
			} catch (err) {
				console.error('Auth init error', err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		init();

		const { data: subscriptionData } = supabase.auth.onAuthStateChange(async (_event, session) => {
			const currentUser = session?.user ?? null;
			setUser(currentUser);
			if (currentUser) {
				await fetchProfile(currentUser.id);
			} else {
				setProfile(null);
			}
			setLoading(false);
		});

		return () => {
			mounted = false;
			// unsubscribe
			try {
				// subscriptionData may contain { subscription }
				// v2 returns { subscription }
				// @ts-ignore
				subscriptionData?.subscription?.unsubscribe?.();
			} catch (e) {
				// ignore
			}
		};
	}, []);

	async function fetchProfile(id: string) {
		try {
			const { data } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
			setProfile((data as Profile) ?? null);
		} catch (err) {
			console.error('Failed to fetch profile', err);
			setProfile(null);
		}
	}

	async function signOut() {
		try {
			await supabase.auth.signOut();
			setUser(null);
			setProfile(null);
		} catch (err) {
			console.error('Sign out error', err);
		}
	}

	return (
		<AuthContext.Provider value={{ user, profile, loading, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}

